import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { testPreConditions } from 'test/tools/testPreConditions';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  })) 
  //todo: deleteme on production
  await testPreConditions();

  /*---Swagger --*/
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Cerber')
    .setDescription('Cerber Device API')
    .setVersion('1.0')
    .build()


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /*-----------*/

  

  await app.listen(3333);
}
bootstrap();
