import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KycController } from './kyc.controller';
import { GatewayKycService } from '../../service/kyc.service';

@Module({
  imports: [
    HttpModule.register({
      withCredentials: true,
    }),
  ],
  controllers: [KycController],
  providers: [GatewayKycService],
})
export class KycModule {}
