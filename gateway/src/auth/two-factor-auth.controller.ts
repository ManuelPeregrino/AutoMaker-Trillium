import {
  Controller,
  Post,
  Body,
  Headers,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ServicesService } from '../services/services.service';

@Controller('2fa')
export class TwoFactorAuthController {
  private readonly logger = new Logger(TwoFactorAuthController.name);

  constructor(private readonly servicesService: ServicesService) {}

  @Post('generate-qr')
  async generateQrCode(@Headers('Authorization') authorization: string) {
    this.logger.log('Generando código QR para 2FA');
    try {
      const qrCodeBuffer =
        await this.servicesService.generateQrCode(authorization);
      this.logger.log('Código QR generado exitosamente');
      return {
        message: 'Código QR generado exitosamente',
        qrCode: qrCodeBuffer.toString('base64'), // Convertir el buffer a Base64
      };
    } catch (error) {
      this.handleError(error, 'generateQrCode');
    }
  }

  @Post('turn-on')
  async turnOn2FA(
    @Body('code') code: string,
    @Headers('Authorization') authorization: string,
  ) {
    this.logger.log('Activando 2FA');
    try {
      const response = await this.servicesService.turnOn2FA(
        code,
        authorization,
      );
      this.logger.log('2FA activado exitosamente');
      return response;
    } catch (error) {
      this.handleError(error, 'turnOn2FA');
    }
  }

  @Post('authenticate')
  async authenticate2FA(
    @Body('code') code: string,
    @Headers('Authorization') authorization: string,
  ) {
    this.logger.log('Autenticando con 2FA');
    try {
      const response = await this.servicesService.authenticate2FA(
        code,
        authorization,
      );
      this.logger.log('Autenticación con 2FA exitosa');
      return response;
    } catch (error) {
      this.handleError(error, 'authenticate2FA');
    }
  }

  // Manejo centralizado de errores
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
