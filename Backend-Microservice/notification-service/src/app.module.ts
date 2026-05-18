import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { NotificationService } from './service/notification.service';
import { OtpProcessor } from './queue/otp.processor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    BullModule.registerQueue({
      name: 'otp-queue',
    }),
  ],
  providers: [NotificationService, OtpProcessor],
})
export class AppModule {}
