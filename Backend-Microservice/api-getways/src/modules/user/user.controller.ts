import { Controller, Post, Body } from '@nestjs/common';
import { GatewayUserService } from '../../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: GatewayUserService) {}

  @Post('register')
  async register(@Body() dto: any) {
    return this.userService.register(dto);
  }

  @Post('send-otp')
  async sendOtp(@Body() dto: any) {
    return this.userService.sendOtp(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: any) {
    return this.userService.verifyOtp(dto);
  }

  @Post('resend-otp')
  async resendOtp(@Body() dto: any) {
    return this.userService.resendOtp(dto);
  }
}
