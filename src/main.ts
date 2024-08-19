import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  // // envs
  const PORT = envs.PORT;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.NATS_SERVERS,
      },
    },
  );

  // // logger ------------
  const logger = new Logger('AUTH MAIN');

  // // set global pipes ------------
  app.useGlobalPipes(
    // validate DTOs
    new ValidationPipe({
      whitelist: true, // remueve extra data of DTO - like Mongoose ODM
      // forbidNonWhitelisted: true, // envia 1 error con las properties q NO estan definidas en DTO
    }),
  );

  // start
  await app.listen();
  logger.log(`AUTH Microservice is listening on port ${PORT}`);
}
bootstrap();
