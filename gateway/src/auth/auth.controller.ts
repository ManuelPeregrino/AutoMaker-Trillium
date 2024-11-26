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

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly servicesService: ServicesService) {}

  @Post('register')
  async register(@Body() createUserDto: any) {
    this.logger.log('Intentando registrar un nuevo usuario');
    try {
      const response = await this.servicesService.registerUser(createUserDto);
      this.logger.log('Usuario registrado exitosamente');
      return response;
    } catch (error) {
      this.handleError(error, 'register');
    }
  }

  @Post('signIn')
  async signIn(@Body() loginDto: any) {
    this.logger.log('Intentando iniciar sesión');
    try {
      const response = await this.servicesService.signInUser(loginDto);
      this.logger.log('Inicio de sesión exitoso');
      return response;
    } catch (error) {
      this.handleError(error, 'signIn');
    }
  }

  @Post('request-reset-password')
  async requestPasswordReset(@Body('email') email: string) {
    this.logger.log(`Solicitando código de restablecimiento para ${email}`);
    try {
      const response = await this.servicesService.requestPasswordReset(email);
      this.logger.log('Código de restablecimiento enviado');
      return response;
    } catch (error) {
      this.handleError(error, 'requestPasswordReset');
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetDto: any) {
    this.logger.log('Intentando restablecer la contraseña');
    try {
      const response = await this.servicesService.resetPassword(resetDto);
      this.logger.log('Contraseña restablecida exitosamente');
      return response;
    } catch (error) {
      this.handleError(error, 'resetPassword');
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
