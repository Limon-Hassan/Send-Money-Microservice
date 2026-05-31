import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
   const app = await NestFactory.create(AppModule, {
     rawBody: true,
   });
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

  app.use('/', (req: any, res: any, next: any) => {
    if (req.path === '/' && req.method === 'GET') {
      return res.json({ message: 'Send Money Server is Running!' });
    }
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API Gateway running on port ${port}`);
}
bootstrap();
