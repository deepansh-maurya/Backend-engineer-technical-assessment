import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Book Review API')
    .setDescription('A simple API to manage books and their reviews')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL: /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
