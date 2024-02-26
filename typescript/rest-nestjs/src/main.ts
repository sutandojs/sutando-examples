import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SutandoExceptionFilter } from './filters/sutando-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new SutandoExceptionFilter);
  await app.listen(3000);
}
bootstrap();
