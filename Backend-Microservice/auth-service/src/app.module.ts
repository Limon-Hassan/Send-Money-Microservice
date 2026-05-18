import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from './utils/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { KycModule } from './modules/kyc/kyc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT', 6379),
          password: configService.get('REDIS_PASSWORD'),
          username: configService.get('REDIS_USERNAME') || 'default',
          tls: {},
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    KycModule
  ],
})
export class AppModule {}
