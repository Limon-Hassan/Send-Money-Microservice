import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createRedisClient } from './config/redis.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  });
  createRedisClient();
  const port = process.env.PORT || 3003;
  await app.listen(port);
  console.log(`Notification Service running on port ${port} ✅`);
}
bootstrap();
