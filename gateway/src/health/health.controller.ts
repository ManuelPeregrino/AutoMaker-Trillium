import {
  Controller,
  Get,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ServicesService } from '../services/services.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getHealth() {
    this.logger.log('Verificando el estado de salud del servicio');
    try {
      const response = await this.servicesService.getHealth();
      this.logger.log('Estado de salud obtenido exitosamente');
      return response;
    } catch (error) {
      this.handleError(error, 'getHealth');
    }
  }

  // Método centralizado para manejar errores
  private handleError(error: any, method: string): void {
    this.logger.error(`[${method}] Error`, error);

    if (error.response) {
      throw new HttpException(
        {
          message: error.response.data?.message || 'Error en el servicio',
          details: error.response.data,
        },
        error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (error.request) {
      throw new HttpException(
        'No se recibió respuesta del servidor',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } else {
      throw new HttpException(
        'Error interno del cliente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
