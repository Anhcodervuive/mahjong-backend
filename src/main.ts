import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  // Register global filter for Prisma Exceptions
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  
  app.enableCors({
    origin: '*', // Allow all origins for now, or specify the frontend port
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
