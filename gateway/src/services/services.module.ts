import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // Tiempo límite para solicitudes HTTP
      maxRedirects: 5, // Máximos redireccionamientos permitidos
    }),
  ],
  providers: [ServicesService],
  exports: [ServicesService], // Exporta para usar en otros módulos
})
export class ServicesModule {}
