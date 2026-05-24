import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  const config = new DocumentBuilder()
    .setTitle("Inventory example")
    .setDescription("The product API description")
    .setVersion("1.0")
    .addTag("product")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
