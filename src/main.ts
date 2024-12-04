import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the directory for HBS views
  app.setBaseViewsDir(join(__dirname, '..', 'public', 'views'));
  app.setViewEngine('hbs');

  app.use(cookieParser());

  // Serve static assets
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Start server
  await app.listen(3000);
}
bootstrap();
