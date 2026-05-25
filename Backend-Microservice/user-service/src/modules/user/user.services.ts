import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '../../utils/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { generateOtp } from '../../shared/utils/generateOtp';
import { redisKeys } from '../../shared/constants/redisKeys';
import { OtpValidationDto } from './dto/otp.dto';
import { ResendOTPDto } from './dto/resendOTP.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { validatePhoneNumber } from 'user-service/src/shared/utils/phone.validator';

@Injectable()
export class UserService {
  private redis: Redis;

  constructor(
    private prisma: PrismaService,
    @InjectQueue('otp-queue') private otpQueue: Queue,
  ) {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: +(process.env.REDIS_PORT || 6379),
    });
  }

  async register(dto: RegisterDto) {
    try {
      let formattedPhone: string | null = null;

      if (dto.phone) {
        const phoneResult = validatePhoneNumber(dto.phone, dto.dialCode);
        if (!phoneResult.isValid) {
          throw new Error(phoneResult.errorMessage);
        }
        formattedPhone = phoneResult.formatted;
      }

      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existing) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phone: formattedPhone,
          password: hashedPassword,
          currency: dto.currency,
        },
      });

      return {
        message: 'Registration successful. Please select OTP channel.',
        userId: user.id,
        otpChannels: {
          email: user.email,
          phone: user.phone ?? null,
        },
      };
    } catch (error) {
      return {
        message: `Registration failed: ${error.message}`,
      };
    }
  }

  async sendOtp(dto: SendOtpDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.isVerified) {
        throw new Error('User already verified');
      }

      if (dto.channel === 'phone' && !user.phone) {
        throw new Error('Phone number not found');
      }

      const otp = generateOtp();

      await this.redis.setex(redisKeys.otp(dto.userId), 300, otp);

      await this.otpQueue.add('send-otp', {
        userId: user.id,
        email: dto.channel === 'email' ? user.email : null,
        phone: dto.channel === 'phone' ? user.phone : null,
        otp,
      });

      return {
        message: `OTP sent to your ${dto.channel}`,
        channel: dto.channel,
        userId: user.id,
      };
    } catch (error) {
      return {
        message: `Registration failed: ${error.message}`,
      };
    }
  }

  async validateOtp(dto: OtpValidationDto) {
    try {
      const storedOTP = await this.redis.get(redisKeys.otp(dto.userId));

      if (!storedOTP) {
        throw new Error('OTP expired or not found');
      }

      if (storedOTP !== dto.otp) {
        throw new Error('Invalid OTP');
      }

      await this.redis.del(redisKeys.otp(dto.userId));

      await this.prisma.user.update({
        where: { id: dto.userId },
        data: { isVerified: true },
      });

      return {
        message: 'OTP validated successfully. User verified.',
      };
    } catch (error) {
      return {
        message: `Registration failed: ${error.message}`,
      };
    }
  }

  async resendOtp(dto: ResendOTPDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.isVerified) {
        throw new Error('User already verified');
      }

      const otp = generateOtp();
      await this.redis.setex(redisKeys.otp(user.id), 300, otp);

      console.log(`Resent OTP for ${user.email}: ${otp}`);

      return {
        message: 'OTP resent successfully.',
      };
    } catch (error) {
      return {
        message: `Registration failed: ${error.message}`,
      };
    }
  }

  async getUserByEmailOrPhone(emailOrPhone: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: emailOrPhone }, { phone: { contains: emailOrPhone } }],
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        password: user.password,
        isVerified: user.isVerified,
      };
    } catch (error) {
      throw new Error(`Fetch user failed: ${error.message}`);
    }
  }

  async googleRegister(dto: {
    email: string;
    fullName: string;
    googleId: string;
    avatar: string | null;
    currency: string;
  }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      return existing;
    }

    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        password: '',
        currency: dto.currency,
        googleId: dto.googleId,
        avatar: dto.avatar,
        isVerified: true,
      },
    });

    return { data: user };
  }

  

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        found: false,
        maskedEmail: null,
        userId: null,
      };
    }

    return {
      found: true,
      maskedEmail: this.maskEmail(user.email), 
      userId: user.id,
      email: user.email,
    };
  }

  async resetPassword(userId: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password reset successful.' };
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully.' };
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    const visible = local.slice(0, 2); 
    return `${visible}******@${domain}`;
  }
}
