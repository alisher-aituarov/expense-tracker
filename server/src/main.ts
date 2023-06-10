import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DBService } from './db.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(DBService);
  await prismaService.enableShutdownHooks(app);
  // Add request body validation middleware
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
}
bootstrap();
