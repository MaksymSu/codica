import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Codica test api')
  .setDescription('transactions')
  .setVersion('1.0.0')
  .addTag('LuckyBot')
  //.addBearerAuth(undefined, 'defaultBearerAuth')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.enableCors();
  await app.listen(port, () => console.log('server started on port', port));
}

bootstrap();
