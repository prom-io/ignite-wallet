import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {PromTokenService} from './modules/promToken/services/promToken.service';
import { loggerServiceInstance } from './logging/logger-service-instance';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerServiceInstance,
  });
  const promTokenService: PromTokenService = app.get(PromTokenService);
  promTokenService.transferListener();
  promTokenService.approvalListener();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
