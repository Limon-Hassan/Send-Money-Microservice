import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KycController } from './kyc.controller';
import { GatewayKycService } from '../../service/kyc.service';

@Module({
  imports: [HttpModule],
  controllers: [KycController],
  providers: [GatewayKycService],
})
export class KycModule {}
