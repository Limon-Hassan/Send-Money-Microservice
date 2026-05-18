import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.modules';
import { BullModule } from '@nestjs/bull';

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
    UserModule,
  ],
})
export class AppModule {}
