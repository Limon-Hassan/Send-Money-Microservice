import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as http from 'http';

@Injectable()
export class GatewayKycService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  private getAuthUrl() {
    return this.config.get('AUTH_SERVICE_URL');
  }

  async initKyc(cookies: string) {
    const accessToken = this.extractToken(cookies, 'accessToken');

    const { data } = await firstValueFrom(
      this.http.post(
        `${this.getAuthUrl()}/kyc/init`,
        {},
        {
          headers: {
            cookie: cookies,
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
          httpAgent: new http.Agent(),
        },
      ),
    );
    return data;
  }

  async getStatus(cookies: string) {
    const accessToken = this.extractToken(cookies, 'accessToken');

    const { data } = await firstValueFrom(
      this.http.get(`${this.getAuthUrl()}/kyc/status`, {
        headers: {
          cookie: cookies,
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        httpAgent: new http.Agent(),
      }),
    );
    return data;
  }

  async handleWebhook(signature: string, body: any) {
    const { data } = await firstValueFrom(
      this.http.post(`${this.getAuthUrl()}/kyc/webhook`, body, {
        headers: {
          'x-payload-digest': signature,
          'Content-Type': 'application/json',
        },
      }),
    );
    return data;
  }

  private extractToken(cookies: string, name: string): string | null {
    const match = cookies.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
    return match ? match[1] : null;
  }
}
