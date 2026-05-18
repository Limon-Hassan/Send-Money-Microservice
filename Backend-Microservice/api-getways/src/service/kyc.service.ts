import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayKycService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async initKyc(cookies: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('AUTH_SERVICE_URL')}/kyc/init`,
        {},
        { headers: { Cookie: cookies } },
      ),
    );
    return data;
  }

  async getStatus(cookies: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.config.get('AUTH_SERVICE_URL')}/kyc/status`, {
        headers: { Cookie: cookies },
      }),
    );
    return data;
  }

  async handleWebhook(body: any) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('AUTH_SERVICE_URL')}/kyc/webhook`,
        body,
      ),
    );
    return data;
  }
}
