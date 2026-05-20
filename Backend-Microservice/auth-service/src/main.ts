import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './utils/prisma.service';
import { createRedisClient } from './config/redis.config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://secure.thesendmoney.com',
      'https://www.secure.thesendmoney.com',
      'https://thesendmoney.com',
      'https://www.thesendmoney.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  createRedisClient();

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Auth Service running on port ${port}`);
}
bootstrap();
