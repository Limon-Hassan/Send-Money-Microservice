import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.userService.getProfile(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(
    @Body() body: { currentPassword: string; newPassword: string },
    @Req() req: any,
  ) {
    return this.userService.changePassword(
      req.user.userId,
      body.currentPassword,
      body.newPassword,
    );
  }
}
