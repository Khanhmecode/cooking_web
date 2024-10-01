import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3080;
console.log(`Launching NestJS app on port ${port}`);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.enableCors();  
  await app.listen(port);
}
bootstrap();
