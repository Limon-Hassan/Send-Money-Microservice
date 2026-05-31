import { Controller, Post, Get, Req, Body, Headers, RawBodyRequest } from '@nestjs/common';
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
    @Req() req: RawBodyRequest<Request>,
    @Headers('x-payload-digest') signature: string,
  ) {
    const rawBody = req.rawBody?.toString('utf8') ?? '';
    return this.kycService.handleWebhook(signature, rawBody);
  }

  @Get('status')
  async status(@Req() req: Request) {
    return this.kycService.getStatus(req.headers.cookie || '');
  }
}
