import { Controller, Post, Body, Get, Query, Req } from '@nestjs/common';
import { UserService } from './user.services';
import { RegisterDto } from './dto/register.dto';
import { OtpValidationDto } from './dto/otp.dto';
import { ResendOTPDto } from './dto/resendOTP.dto';
import { SendOtpDto } from './dto/send-otp.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.userService.register(dto);
  }

  @Post('send-otp')
  async sendOtp(@Body() dto: SendOtpDto) {
    return this.userService.sendOtp(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: OtpValidationDto) {
    return this.userService.validateOtp(dto);
  }

  @Post('resend-otp')
  async resendOtp(@Body() dto: ResendOTPDto) {
    return this.userService.resendOtp(dto);
  }

  @Get('internal')
  async getUser(@Query('emailOrPhone') emailOrPhone: string) {
    return this.userService.getUserByEmailOrPhone(emailOrPhone);
  }

  @Post('google-register')
  async googleRegister(@Body() body: any) {
    return this.userService.googleRegister(body);
  }

  @Get('profile')
  async getProfile(@Query('userId') userId: string) {
    return this.userService.getProfile(userId);
  }

  @Post('internal/find-by-email')
  async findByEmail(@Body() body: { email: string }) {
    return this.userService.findUserByEmail(body.email);
  }

  @Post('internal/reset-password')
  async resetPassword(@Body() body: { userId: string; newPassword: string }) {
    return this.userService.resetPassword(body.userId, body.newPassword);
  }

  @Post('change-password')
  async changePassword(
    @Body() body: { currentPassword: string; newPassword: string },
    @Req() req,
  ) {
    return this.userService.changePassword(
      req.user.id,
      body.currentPassword,
      body.newPassword,
    );
  }
}
