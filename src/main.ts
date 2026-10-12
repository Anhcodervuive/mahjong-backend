import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { AppLoggerService } from './common/app-logger.service';
import { Request, Response, NextFunction } from 'express';
import * as express from 'express';

async function bootstrap() {
  const logger = new AppLoggerService('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger });

  // Support vendor MIME types (such as N-Genius application/vnd.ni-payment.v2+json)
  app.use(express.json({ type: ['application/json', 'application/*+json', '*/*+json'] }));
  app.use(express.urlencoded({ extended: true }));

  // Custom CORS middleware to guarantee all headers and OPTIONS 204 preflights succeed
  app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Origin, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Request-Headers');

    // Handle preflight OPTIONS directly
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl) or any origin
      callback(null, true);
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With, Origin, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Request-Headers',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Mahjong Backend is running on port ${port} [NODE_ENV=${process.env.NODE_ENV || 'development'}]`);
}
bootstrap();
