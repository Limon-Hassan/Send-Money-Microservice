import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { GatewayAuthService } from '../../service/auth.service';

@Module({
  imports: [
    HttpModule.register({
      withCredentials: true,
    }),
  ],
  controllers: [AuthController],
  providers: [GatewayAuthService],
})
export class AuthModule {}
