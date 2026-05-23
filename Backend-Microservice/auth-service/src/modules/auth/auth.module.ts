import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BullModule } from '@nestjs/bull';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KycModule } from '../kyc/kyc.module';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { GoogleStrategy } from '../../strategies/google.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    BullModule.registerQueue({
      name: 'otp-queue',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, KycModule],
})
export class AuthModule {}
