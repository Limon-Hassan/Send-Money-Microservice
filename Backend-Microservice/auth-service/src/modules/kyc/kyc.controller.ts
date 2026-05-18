import {
  Controller,
  Post,
  Get,
  Req,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { KycService } from './kyc.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('kyc')
export class KycController {
  constructor(
    private readonly kycService: KycService,
    private readonly jwt: JwtService,
  ) {}

  private getUserId(req: Request): string {
    const token = req.cookies['accessToken'];
    if (!token) throw new UnauthorizedException('No access token');

    try {
      const payload = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      }) as { sub: string };
      return payload.sub;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  @Post('init')
  async init(@Req() req: Request) {
    const userId = this.getUserId(req);
    return this.kycService.initKyc(userId);
  }

  @Post('webhook')
  async webhook(
    @Req() req: Request,
    @Headers('x-payload-digest') signature: string,
  ) {
    const rawBody = JSON.stringify(req.body);
    return this.kycService.handleWebhook(req.body, signature, rawBody);
  }

  @Get('status')
  async status(@Req() req: Request) {
    const userId = this.getUserId(req);
    return this.kycService.getStatus(userId);
  }
}
