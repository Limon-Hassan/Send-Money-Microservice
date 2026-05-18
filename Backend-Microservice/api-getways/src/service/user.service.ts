import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayUserService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async register(dto: any) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('USER_SERVICE_URL')}/user/register`,
        dto,
      ),
    );
    return data;
  }

  async sendOtp(dto: any) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('USER_SERVICE_URL')}/user/send-otp`,
        dto,
      ),
    );
    return data;
  }

  async verifyOtp(dto: any) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('USER_SERVICE_URL')}/user/verify-otp`,
        dto,
      ),
    );
    return data;
  }

  async resendOtp(dto: any) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.config.get('USER_SERVICE_URL')}/user/resend-otp`,
        dto,
      ),
    );
    return data;
  }

  async getProfile(userId: string, token: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.config.get('USER_SERVICE_URL')}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      }),
    );
    return data;
  }
}
