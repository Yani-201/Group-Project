import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));  // Removes password from user object responses
  app.useStaticAssets(join(__dirname, '../covers'), {prefix: '/covers'})
  await app.listen(3000);
}
bootstrap();
