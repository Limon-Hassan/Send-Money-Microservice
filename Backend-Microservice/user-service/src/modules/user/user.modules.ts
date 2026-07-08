import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.services';
import { PrismaService } from '../../utils/prisma.service';
import { BullModule } from '@nestjs/bull';
import { InternalController } from './internal.controller';
import { JwtStrategy } from '../../strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    BullModule.registerQueue({
      name: 'otp-queue',
    }),
  ],
  controllers: [UserController, InternalController],
  providers: [UserService, PrismaService, JwtStrategy],
})
export class UserModule {}
