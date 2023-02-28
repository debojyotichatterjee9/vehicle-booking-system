import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  // Using cookie-session
  app.use(cookieSession({
    keys: ["68e109f0f40ca72a15e05cc22786f8e6"]
  }))
  // using Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false
  }));
  await app.listen(3000);
}
bootstrap();
