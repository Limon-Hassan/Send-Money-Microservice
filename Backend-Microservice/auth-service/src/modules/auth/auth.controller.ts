import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UnauthorizedException,
  Param,
  Delete,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';
import { Request, Response } from 'express';
import { Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KycService } from '../kyc/kyc.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly KycService: KycService,
  ) {}

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private clearCookies(res: Response) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('accessToken', {
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
    });
    res.clearCookie('refreshToken', {
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
    });
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto, {
      ip: req.ip,
      ua: req.headers['user-agent'] || '',
    });

    if (result.requiresOtp) return result;
    this.setCookies(res, result.accessToken!, result.refreshToken!);

    return {
      message: result.message,
    };
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() dto: OtpVerifyDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyLoginOtp(dto.userId, dto.otp, {
      ip: req.ip,
      ua: req.headers['user-agent'] || '',
    });

    if (result.success === false) {
      return { message: result.message };
    }
    this.setCookies(res, result.accessToken!, result.refreshToken!);

    return {
      message: 'Login successful',
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: Request & { user: any },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.googleLogin(req.user, {
      ip: req.ip,
      ua: req.headers['user-agent'] || '',
    });

    this.setCookies(res, result.accessToken!, result.refreshToken!);
    const kyc = await this.KycService.getStatus(result.userId!);
    if (kyc.status === 'verified') {
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/kyc`);
    }
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies['refreshToken'];
    if (!token) throw new UnauthorizedException('No refresh token found');

    const result = await this.authService.refreshTokens(token, {
      ip: req.ip,
      ua: req.headers['user-agent'] || '',
    });

    if ('status' in result) throw new UnauthorizedException(result.message);

    this.setCookies(res, result.accessToken!, result.refreshToken!);
    return { message: 'Token refreshed' };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token found');

    await this.authService.logout(refreshToken, {
      ip: req.ip,
      ua: req.headers['user-agent'] || '',
    });

    this.clearCookies(res);
    return { message: 'Logged out successfully' };
  }

  @Post('logout-all')
  async logoutAll(
    @Req() req: Request & { user: any },
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token found');

    const payload = this.authService.decodeToken(refreshToken);
    await this.authService.logoutAll(payload.sub, {
      ip: req.ip,
      ua: req.headers['user-agent'] || '',
    });

    this.clearCookies(res);
    return { message: 'Logged out from all devices' };
  }

  @Get('sessions')
  async getSessions(@Req() req: Request) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token found');

    const payload = this.authService.decodeToken(refreshToken);
    return this.authService.getSessions(payload.sub);
  }

  @Delete('sessions/:sessionId')
  async revokeSession(
    @Param('sessionId') sessionId: string,
    @Req() req: Request,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token found');

    const payload = this.authService.decodeToken(refreshToken);
    return this.authService.revokeSession(payload.sub, sessionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    return this.authService.getMe(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verify(@Req() req: any) {
    const kyc = await this.KycService.getStatus(req.user.userId);
    return {
      valid: true,
      userId: req.user.userId,
      kycStatus: kyc.status, 
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPasswordRequest(body.email);
  }

  @Post('forgot-password/verify-otp')
  async verifyForgotOtp(@Body() body: { userId: string; otp: string }) {
    return this.authService.forgotPasswordVerifyOtp(body.userId, body.otp);
  }

  @Post('forgot-password/reset')
  async resetPassword(
    @Body() body: { userId: string; resetToken: string; newPassword: string },
  ) {
    return this.authService.forgotPasswordReset(
      body.userId,
      body.resetToken,
      body.newPassword,
    );
  }
}
