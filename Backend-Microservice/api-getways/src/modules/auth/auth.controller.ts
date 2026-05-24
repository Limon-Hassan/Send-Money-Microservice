import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { GatewayAuthService } from '../../service/auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: GatewayAuthService) {}

  @Post('login')
  async login(
    @Body() dto: any,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto, {
      ip: req.ip,
      ua: req.headers['user-agent'] || '',
    });

    if (result.requiresOtp) return result;
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {
      message: result.message,
      accessToken: result.accessToken,
    };
  }

  @Get('google')
  google(@Res() res: Response) {
    return res.redirect(`${process.env.AUTH_SERVICE_URL}/auth/google`);
  }

  @Get('google/callback')
  googleCallback(@Req() req: Request, @Res() res: Response) {
    const query = req.url.split('?')[1];

    return res.redirect(
      `${process.env.AUTH_SERVICE_URL}/auth/google/callback?${query}`,
    );
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() dto: any,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyOtp(dto, {
      ip: req.ip,
      ua: req.headers['user-agent'] || '',
    });

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { message: result.message };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.refresh(req.headers.cookie || '');

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.thesendmoney.com' : 'localhost',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: result.message,
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.headers.cookie || '');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }

  @Post('logout-all')
  async logoutAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logoutAll(req.headers.cookie || '');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Logged out from all devices' };
  }

  @Get('sessions')
  async getSessions(@Req() req: Request) {
    console.log('COOKIE HEADER:', req.headers.cookie);
    return this.authService.getSessions(req.headers.cookie || '');
  }

  @Delete('sessions/:sessionId')
  async revokeSession(
    @Param('sessionId') sessionId: string,
    @Req() req: Request,
  ) {
    return this.authService.revokeSession(sessionId, req.headers.cookie || '');
  }
}
