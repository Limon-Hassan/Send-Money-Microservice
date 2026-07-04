import {
  Controller,
  Post,
  Get,
  Req,
  Headers,
  UseGuards,
  RawBodyRequest,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KycService } from './kyc.service';
import { Request } from 'express';

@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('init')
  async init(@Req() req: any) {
    return this.kycService.initKyc(req.user.userId);
  }

  @Post('webhook')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('x-payload-digest') signature: string,
  ) {
    const rawBody = req.rawBody?.toString('utf8') ?? '';
    const payload = JSON.parse(rawBody);
    return this.kycService.handleWebhook(payload, signature, rawBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('status')
  async status(@Req() req: any) {
    return this.kycService.getStatus(req.user.userId);
  }
}
