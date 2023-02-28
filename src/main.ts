import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
const cookieSession = require('cookie-session');
import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie'
import { fastifySession } from '@fastify/session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  // Using cookie-session
  app.register(cookie, {
    secret: "68e109f0f40ca72a15e05cc22786f8e6", // for cookies signature
    parseOptions: {}     // options for parsing cookies
  } as FastifyCookieOptions)
  app.register(fastifySession, { secret: '68e109f0f40ca72a15e05cc22786f8e6' });
  // using Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false
  }));
  await app.listen(3000);
}
bootstrap();
