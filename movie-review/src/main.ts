import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));  // Removes password from user object responses

  await app.listen(3000);
}
bootstrap();
