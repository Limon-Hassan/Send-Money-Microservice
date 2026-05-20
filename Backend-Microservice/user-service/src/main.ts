import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { createRedisClient } from './config/redis.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 app.enableCors({
   origin: [
     'http://localhost:3000',
     'http://localhost:3001',
     'https://send-money-anywhere.pages.dev',
   ],
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
 });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  createRedisClient();
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`User Service running on port ${port}`);
}
bootstrap();
