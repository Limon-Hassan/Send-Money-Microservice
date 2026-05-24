import { Controller, Post, Get, Req, Body, Headers } from '@nestjs/common';
import { GatewayKycService } from '../../service/kyc.service';
import { Request } from 'express';

@Controller('kyc')
export class KycController {
  constructor(private kycService: GatewayKycService) {}

  @Post('init')
  async init(@Req() req: Request) {
    return this.kycService.initKyc(req.headers.cookie || '');
  }

  @Post('webhook')
  async webhook(
    @Body() body: any,
    @Headers('x-payload-digest') signature: string,
  ) {
    return this.kycService.handleWebhook(signature, body);
  }

  @Get('status')
  async status(@Req() req: Request) {
    return this.kycService.getStatus(req.headers.cookie || '');
  }
}
