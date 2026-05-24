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
    const authHeader = req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const payload = this.jwt.decode(token) as { sub: string };
        if (payload?.sub) return payload.sub;
      } catch {}
    }

    const token = req.cookies['accessToken'] || req.cookies['refreshToken'];
    if (!token) throw new UnauthorizedException('No access token');

    try {
      const payload = this.jwt.decode(token) as { sub: string };
      if (!payload?.sub) throw new Error();
      return payload.sub;
    } catch {
      throw new UnauthorizedException('Invalid token');
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
