import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Kanban Project API')
    .setDescription(
      'This is my thrird assignment at Saleshandy, in this project I have implemneted REST API with NestJS, TypeOrm and MySQL. The main goal of this project was to create APIs for Kanban board. Here as you can see there are three major API endpoints, epic, story, and task. Each of them has a CRUD operation. And the relations among the tabels are Epic - Story (One-to-Many), Epic - Task (One-to-Many), Story - Epic (Many-to-One), Story - Task (one-to-Many), Task - Epic (Many-to-One), and Task - Story (Many-to-One).',
    )
    .addTag('epic')
    .addTag('story')
    .addTag('task')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
