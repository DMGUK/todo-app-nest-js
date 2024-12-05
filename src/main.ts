import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'public', 'views'));
  app.setViewEngine('hbs');

  app.use(cookieParser());

  hbs.registerHelper('add', (a, b) => a + b);
  hbs.registerHelper('subtract', (a, b) => a - b);
  hbs.registerHelper('gt', (a, b) => a > b);
  hbs.registerHelper('lt', (a, b) => a < b);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3000);
}
bootstrap();
