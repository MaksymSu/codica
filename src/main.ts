import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MyValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Codica test api')
  .setDescription('It provides some services to store and handle transactions')
  .setVersion('1.0.0')
  .addTag('Transactions API')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.useGlobalPipes(new MyValidationPipe());

  app.enableCors();
  await app.listen(port, () => console.log('server started on port', port));
}

bootstrap();
