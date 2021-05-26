import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  const env = process.env.NODE_ENV || 'development';

  const name = `Rent Books [${env}]`;
  const logger = new Logger(name);

  const options = new DocumentBuilder()
    .setTitle('Rent Books')
    .setDescription('Rent Books System')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0', () => {
    logger.log(`Started at http://localhost:${port}/api`);
  });
}
bootstrap();
