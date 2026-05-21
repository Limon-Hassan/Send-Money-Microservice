import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayAuthService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async login(dto: any, device: { ip: string; ua: string }) {
    const { data } = await firstValueFrom(
      this.http.post(`${this.config.get('AUTH_SERVICE_URL')}/auth/login`, dto, {
        headers: {
          'x-real-ip': device.ip,
          'x-user-agent': device.ua,
        },
      }),
    );
    console.log('AUTH SERVICE RESPONSE:', JSON.stringify(data)); // ← যোগ করো
    return data;
  }

  async verifyOtp(dto: any, device: { ip: string; ua: string }) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('AUTH_SERVICE_URL')}/auth/verify-otp`,
        dto,
        {
          headers: {
            'x-real-ip': device.ip,
            'x-user-agent': device.ua,
          },
        },
      ),
    );
    console.log('VERIFY OTP RESPONSE:', JSON.stringify(data)); // ← যোগ করো
    return data;
  }

  async googleLogin() {
    return `${this.config.get('AUTH_SERVICE_URL')}/auth/google`;
  }

  async refresh(cookies: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('AUTH_SERVICE_URL')}/auth/refresh`,
        {},
        { headers: { Cookie: cookies } },
      ),
    );
    return data;
  }

  async logout(cookies: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('AUTH_SERVICE_URL')}/auth/logout`,
        {},
        { headers: { Cookie: cookies } },
      ),
    );
    return data;
  }

  async logoutAll(cookies: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('AUTH_SERVICE_URL')}/auth/logout-all`,
        {},
        { headers: { Cookie: cookies } },
      ),
    );
    return data;
  }

  async getSessions(cookies: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.config.get('AUTH_SERVICE_URL')}/auth/sessions`, {
        headers: { Cookie: cookies },
      }),
    );
    return data;
  }

  async revokeSession(sessionId: string, cookies: string) {
    const { data } = await firstValueFrom(
      this.http.delete(
        `${this.config.get('AUTH_SERVICE_URL')}/auth/sessions/${sessionId}`,
        { headers: { Cookie: cookies } },
      ),
    );
    return data;
  }
}
