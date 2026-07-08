import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { UserService } from './user.services';

@Controller('internal')
export class InternalController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async getUser(@Query('emailOrPhone') emailOrPhone: string) {
    return this.userService.getUserByEmailOrPhone(emailOrPhone);
  }

  @Post('google-register')
  async googleRegister(@Body() body: any) {
    return this.userService.googleRegister(body);
  }

  @Post('find-by-email')
  async findByEmail(@Body() body: { email: string }) {
    return this.userService.findUserByEmail(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { userId: string; newPassword: string }) {
    return this.userService.resetPassword(body.userId, body.newPassword);
  }
}
