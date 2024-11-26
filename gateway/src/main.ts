import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para las rutas del Gateway
  app.setGlobalPrefix('api');

  // Habilitar CORS si necesitas acceso desde distintos orígenes
  app.enableCors();

  // Puerto de escucha del Gateway
  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    Logger.log(`🚀 Gateway is running on: http://localhost:${port}/api`);
  });
}

bootstrap();
