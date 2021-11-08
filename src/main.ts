import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { CustomValidation } from './users/pipe/user.validation.pipe';
import * as bonjour from 'bonjour';
// import { initMdns } from './base/util/mDNS/mdns.setup';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.use('/images', express.static(join(process.cwd(), 'images/')));
  // initMdns();
  app.setGlobalPrefix('api/v1');
  await app.listen(2001);

  // bonjour.publish({ name: 'My Web Server', type: 'http', port: 3000 });
  //
  // bonjour.find({ type: 'http' }, function (service) {
  //   console.log('Found an HTTP server:', service);
  // });
}
bootstrap();
