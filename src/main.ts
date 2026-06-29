import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: '*', // Allow all origins for now, or specify the frontend port
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
