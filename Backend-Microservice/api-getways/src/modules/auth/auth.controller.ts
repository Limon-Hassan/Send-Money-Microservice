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

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.thesendmoney.com',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.thesendmoney.com',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

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

    this.setCookies(res, result.accessToken, result.refreshToken);
    console.log('Login successful, tokens set in cookies', result.accessToken);
    return { message: result.message };
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

    if (result.success === false) return { message: result.message };
    if (result.requiresOtp) return result;

    this.setCookies(res, result.accessToken, result.refreshToken);
    return { message: 'Login successful' };
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

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.refresh(req.headers.cookie || '');
    this.setCookies(res, result.accessToken, result.refreshToken);
    return { message: result.message, accessToken: result.accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.headers.cookie || '');
    res.clearCookie('accessToken', { domain: '.thesendmoney.com' });
    res.clearCookie('refreshToken', { domain: '.thesendmoney.com' });
    return { message: 'Logged out successfully' };
  }

  @Post('logout-all')
  async logoutAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logoutAll(req.headers.cookie || '');
    res.clearCookie('accessToken', { domain: '.thesendmoney.com' });
    res.clearCookie('refreshToken', { domain: '.thesendmoney.com' });
    return { message: 'Logged out from all devices' };
  }

  @Get('sessions')
  async getSessions(@Req() req: Request) {
    return this.authService.getSessions(req.headers.cookie || '');
  }

  @Delete('sessions/:sessionId')
  async revokeSession(
    @Param('sessionId') sessionId: string,
    @Req() req: Request,
  ) {
    return this.authService.revokeSession(sessionId, req.headers.cookie || '');
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    const authHeader = req.headers['authorization'] || '';
    return this.authService.getMe(req.headers.cookie || '', authHeader);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: any) {
    return this.authService.forgotPassword(dto);
  }

  @Post('forgot-password/verify-otp')
  async forgotPasswordVerifyOtp(@Body() dto: any) {
    return this.authService.forgotPasswordVerifyOtp(dto);
  }

  @Post('forgot-password/reset')
  async forgotPasswordReset(@Body() dto: any) {
    return this.authService.forgotPasswordReset(dto);
  }

  @Post('change-password')
  async changePassword(@Body() dto: any, @Req() req: Request) {
    return this.authService.changePassword(dto, req.headers.cookie || '');
  }
}
