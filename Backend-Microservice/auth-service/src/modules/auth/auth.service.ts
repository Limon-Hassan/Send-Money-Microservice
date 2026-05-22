import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../utils/prisma.service';
import { LoginDto } from './dto/login.dto';
import { generateOtp } from '../../shared/utils/generateOtp';
import { redisKeys } from '../../shared/constants/redisKeys';
import { parseDevice } from '../../shared/utils/device.util';
import {
  hashDevice,
  hashRefreshToken,
} from '../../shared/utils/hash.util';
import { LoginResult } from '../../shared/interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Injectable()
export class AuthService {
  private redis: Redis;

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    @InjectQueue('otp-queue') private otpQueue: Queue,
  ) {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: +(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME || 'default',
      tls: {},
    });
  }

  async validateUser(emailOrPhone: string, password: string) {
    const response = await fetch(
      `${process.env.USER_SERVICE_API_URL}/user/internal?emailOrPhone=${emailOrPhone}`,
    );

    if (!response.ok) {
      throw new UnauthorizedException('User not found');
    }

    const payload = await response.json();
    const user = payload.data ?? payload;

    if (!user.isVerified) {
      throw new UnauthorizedException('User not verified');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

 

  async login(
    dto: LoginDto,
    device: { ip: string; ua: string },
  ): Promise<LoginResult> {
    const user = await this.validateUser(dto.emailOrPhone, dto.password);

    const fingerprint = hashDevice({ ip: device.ip, ua: device.ua });
    const deviceKey = redisKeys.device(user.id, fingerprint);
    const knownDevice = await this.redis.get(deviceKey);

    const parsed = parseDevice(device.ip, device.ua);

    const existingDeviceCount = await this.prisma.device.count({
      where: { userId: user.id },
    });

    await this.prisma.device.upsert({
      where: {
        userId_fingerprint: { userId: user.id, fingerprint },
      },
      update: {
        lastSeenAt: new Date(),
        ipAddress: device.ip,
        userAgent: device.ua,
        browser: parsed.browser,
        os: parsed.os,
        deviceName: parsed.deviceName,
        country: parsed.country,
        city: parsed.city,
      },
      create: {
        userId: user.id,
        fingerprint,
        ipAddress: device.ip,
        userAgent: device.ua,
        browser: parsed.browser,
        os: parsed.os,
        deviceName: parsed.deviceName,
        country: parsed.country,
        city: parsed.city,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN_ATTEMPT',
        ipAddress: device.ip,
        userAgent: device.ua,
        metadata: {
          browser: parsed.browser,
          os: parsed.os,
          country: parsed.country,
          city: parsed.city,
        },
      },
    });

    if (existingDeviceCount === 0) {
      await this.redis.setex(deviceKey, 30 * 24 * 60 * 60, '1');
      return this.generateTokens(user.id, fingerprint);
    }

    if (!knownDevice) {
      const otp = generateOtp();
      await this.redis.setex(redisKeys.otp(user.id), 300, otp);

      await this.otpQueue.add('send-otp', {
        userId: user.id,
        email: user.email,
        phone: null,
        otp,
        deviceInfo: {
          browser: parsed.browser,
          os: parsed.os,
          country: parsed.country,
          city: parsed.city,
        },
      });

      return {
        requiresOtp: true,
        userId: user.id,
        message: 'New device detected. OTP sent.',
      };
    }

    return this.generateTokens(user.id, fingerprint);
  }

  async verifyLoginOtp(
    userId: string,
    otp: string,
    device: { ip: string; ua: string },
  ) {
    const storedOtp = await this.redis.get(redisKeys.otp(userId));
    if (!storedOtp) {
      return { success: false, message: 'OTP expired. Please login again.' };
    }

    if (storedOtp !== otp) {
      return { success: false, message: 'Invalid OTP. Please try again.' };
    }

    await this.redis.del(redisKeys.otp(userId));

    const fingerprint = hashDevice({ ip: device.ip, ua: device.ua });
    await this.redis.setex(
      redisKeys.device(userId, fingerprint),
      30 * 24 * 60 * 60,
      '1',
    );
    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'LOGIN_SUCCESS',
        ipAddress: device.ip,
        userAgent: device.ua,
      },
    });
    return this.generateTokens(userId, fingerprint);
  }

  private async generateTokens(
    userId: string,
    fingerprint: string,
  ): Promise<LoginResult> {
    const accessToken = this.jwt.sign({ sub: userId }, { expiresIn: '15m' });

    const refreshToken = this.jwt.sign(
      { sub: userId },
      {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    let sessionKey = `refresh:${userId}:${fingerprint}`;
    const hashedRefresh = hashRefreshToken(refreshToken);
    await this.redis.setex(sessionKey, 7 * 24 * 60 * 60, hashedRefresh);

    const device = await this.prisma.device.findUnique({
      where: { userId_fingerprint: { userId, fingerprint } },
    });

    await this.prisma.session.create({
      data: {
        userId,
        tokenHash: hashedRefresh,
        fingerprint,
        deviceId: device?.id ?? null,
        refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { message: 'Login successful', accessToken, refreshToken };
  }

  async refreshTokens(
    refreshToken: string,
    device: { ip: string; ua: string },
  ) {
    let payload: any;
    try {
      payload = this.jwt.verify(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const fingerprint = hashDevice(device);
    const stored = await this.redis.get(
      `refresh:${payload.sub}:${fingerprint}`,
    );

    if (!stored || stored !== hashRefreshToken(refreshToken)) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.redis.del(`refresh:${payload.sub}:${fingerprint}`);

    return this.generateTokens(payload.sub, fingerprint);
  }

  async googleLogin(
    googleUser: {
      email: string;
      fullName: string;
      googleId: string;
      avatar: string | null;
    },
    device: { ip: string; ua: string },
  ): Promise<LoginResult> {
    const response = await fetch(
      `${process.env.USER_SERVICE_API_URL}/user/internal?emailOrPhone=${googleUser.email}`,
    );

    let user: any;

    if (!response.ok) {
      const registerRes = await fetch(
        `${process.env.USER_SERVICE_API_URL}/user/google-register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: googleUser.email,
            fullName: googleUser.fullName,
            googleId: googleUser.googleId,
            avatar: googleUser.avatar,
            currency: 'BDT',
          }),
        },
      );

      if (!registerRes.ok) {
        throw new Error('Google registration failed');
      }
      const registered = await registerRes.json();
      user = registered.data ?? registered;
    } else {
      const payload = await response.json();
      user = payload.data ?? payload;
    }

    const fingerprint = hashDevice({ ip: device.ip, ua: device.ua });

    const parsed = parseDevice(device.ip, device.ua);

    await this.redis.setex(
      redisKeys.device(user.id, fingerprint),
      30 * 24 * 60 * 60,
      '1',
    );

    await this.prisma.device.upsert({
      where: {
        userId_fingerprint: { userId: user.id, fingerprint },
      },
      update: {
        lastSeenAt: new Date(),
        ipAddress: device.ip,
        userAgent: device.ua,
        browser: parsed.browser,
        os: parsed.os,
        deviceName: parsed.deviceName,
        country: parsed.country,
        city: parsed.city,
      },
      create: {
        userId: user.id,
        fingerprint,
        ipAddress: device.ip,
        userAgent: device.ua,
        browser: parsed.browser,
        os: parsed.os,
        deviceName: parsed.deviceName,
        country: parsed.country,
        city: parsed.city,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'GOOGLE_LOGIN',
        ipAddress: device.ip,
        userAgent: device.ua,
        metadata: {
          browser: parsed.browser,
          os: parsed.os,
          country: parsed.country,
          city: parsed.city,
        },
      },
    });

    return this.generateTokens(user.id, fingerprint);
  }

  async logout(refreshToken: string, device: { ip: string; ua: string }) {
    let payload: any;
    try {
      payload = this.jwt.verify(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const fingerprint = hashDevice(device);
    const sessionKey = `refresh:${payload.sub}:${fingerprint}`;

    await this.redis.del(sessionKey);

    const hashedToken = hashRefreshToken(refreshToken);
    await this.prisma.session.deleteMany({
      where: { userId: payload.sub, tokenHash: hashedToken },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: payload.sub,
        action: 'LOGOUT',
        ipAddress: device.ip,
        userAgent: device.ua,
      },
    });
  }

  async logoutAll(userId: string, device: { ip: string; ua: string }) {
    await this.prisma.session.deleteMany({ where: { userId } });

    const keys = await this.redis.keys(`refresh:${userId}:*`);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'LOGOUT_ALL',
        ipAddress: device.ip,
        userAgent: device.ua,
      },
    });
  }

  decodeToken(token: string): { sub: string } {
    try {
      return this.jwt.verify(token, {
        secret: process.env.REFRESH_SECRET,
      }) as { sub: string };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getSessions(userId: string) {
    const sessions = await this.prisma.session.findMany({
      where: {
        userId,
        refreshExpiresAt: { gt: new Date() },
        revoked: false,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        refreshExpiresAt: true,
        device: {
          select: {
            browser: true,
            os: true,
            deviceName: true,
            country: true,
            city: true,
            ipAddress: true,
            trusted: true,
            lastSeenAt: true,
          },
        },
      },
    });

    return sessions;
  }

  async revokeSession(userId: string, sessionId: string) {
    const session = await this.prisma.session.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }
    await this.redis.del(`refresh:${userId}:${session.fingerprint}`);

    await this.prisma.session.delete({ where: { id: sessionId } });

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'SESSION_REVOKED',
        ipAddress: 'N/A',
        userAgent: 'N/A',
      },
    });

    return { message: 'Session revoked' };
  }
}
