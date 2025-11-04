import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from 'helmet';
import * as passport from 'passport';
import { ValidationError } from 'class-validator';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files from uploads directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });


  app.use(passport.initialize()); 

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: false,
    transformOptions: {
      enableImplicitConversion: true,
    },
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.flatMap((error) => extractMessages(error));
      return new BadRequestException({ message: messages });
    },
  }));

  // 🔒 Security headers
  app.use(helmet());


  // 🌐 CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // ✅ replace with trusted domains
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.setGlobalPrefix('ferga');

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
function extractMessages(error: ValidationError): string[] {
  const messages = new Set<string>();

  if (error.constraints) {
    Object.values(error.constraints).forEach((msg) => messages.add(msg));
  }

  if (error.children && error.children.length > 0) {
    error.children.forEach((child) => {
      extractMessages(child).forEach((msg) => messages.add(msg));
    });
  }

  return Array.from(messages);
}

