import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user.controller';
import { GatewayUserService } from '../../service/user.service';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [GatewayUserService],
})
export class UserModule {}
