import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(private readonly httpService: HttpService) {}

  // Llamada al endpoint health
  async getHealth(): Promise<any> {
    const url = 'https://apiautomakerhost.serveirc.com/api/v1/health';
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.handleError(error, 'getHealth');
      throw error;
    }
  }

  // Llamada al endpoint para obtener todos los usuarios
  async getAllUsers(authorization: string): Promise<any> {
    const url = 'https://apiautomakerhost.serveirc.com/api/v1/users';
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: authorization },
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'getAllUsers');
      throw error;
    }
  }

  // Crear un nuevo usuario
  async createUser(userDto: any, authorization: string): Promise<any> {
    const url = 'https://apiautomakerhost.serveirc.com/api/v1/users';
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, userDto, {
          headers: { Authorization: authorization },
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'createUser');
      throw error;
    }
  }

  // Obtener usuario por ID
  async getUserById(id: string, authorization: string): Promise<any> {
    const url = `https://apiautomakerhost.serveirc.com/api/v1/users/${id}`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: authorization },
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'getUserById');
      throw error;
    }
  }

  // Actualizar usuario
  async updateUser(
    id: string,
    updateUserDto: any,
    authorization: string,
  ): Promise<any> {
    const url = `https://apiautomakerhost.serveirc.com/api/v1/users/${id}`;
    try {
      const response = await lastValueFrom(
        this.httpService.patch(url, updateUserDto, {
          headers: { Authorization: authorization },
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'updateUser');
      throw error;
    }
  }

  // Eliminar usuario
  async deleteUser(id: string, authorization: string): Promise<any> {
    const url = `https://apiautomakerhost.serveirc.com/api/v1/users/${id}`;
    try {
      const response = await lastValueFrom(
        this.httpService.delete(url, {
          headers: { Authorization: authorization },
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'deleteUser');
      throw error;
    }
  }

  // Método de manejo de errores centralizado
  private handleError(error: any, method: string): void {
    if (error.response) {
      // El servidor respondió con un estado fuera del rango 2xx
      this.logger.error(`[${method}] Error de respuesta:`, {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      this.logger.error(
        `[${method}] Sin respuesta del servidor:`,
        error.request,
      );
    } else {
      // Algo sucedió al configurar la solicitud
      this.logger.error(`[${method}] Error de configuración:`, error.message);
    }
  }

  // Método de registro de nuevo usuario
  async registerUser(userDto: any): Promise<any> {
    const url = 'https://apiautomakerhost.serveirc.com/api/v1/auth/register';
    try {
      const response = await lastValueFrom(this.httpService.post(url, userDto));
      return response.data;
    } catch (error) {
      this.handleError(error, 'registerUser');
      throw error;
    }
  }

  // Método de inicio de sesión
  async signInUser(loginDto: any): Promise<any> {
    const url = 'https://apiautomakerhost.serveirc.com/api/v1/auth/signIn';
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, loginDto),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'signInUser');
      throw error;
    }
  }

  // Solicitar código de restablecimiento de contraseña
  async requestPasswordReset(email: string): Promise<any> {
    const url =
      'https://apiautomakerhost.serveirc.com/api/v1/auth/request-reset-password';
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, { email }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'requestPasswordReset');
      throw error;
    }
  }

  // Restablecer la contraseña
  async resetPassword(dto: any): Promise<any> {
    const url =
      'https://apiautomakerhost.serveirc.com/api/v1/auth/reset-password';
    try {
      const response = await lastValueFrom(this.httpService.post(url, dto));
      return response.data;
    } catch (error) {
      this.handleError(error, 'resetPassword');
      throw error;
    }
  }

  // Generar código QR para 2FA
  async generateQrCode(authorization: string): Promise<Buffer> {
    const url = 'https://apiautomakerhost.serveirc.com/api/v1/2fa/generate-qr';
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, null, {
          headers: { Authorization: authorization },
          responseType: 'arraybuffer', // Para manejar la imagen como buffer
        }),
      );
      return response.data; // Buffer de imagen PNG
    } catch (error) {
      this.handleError(error, 'generateQrCode');
      throw error;
    }
  }

  // Activar 2FA
  async turnOn2FA(code: string, authorization: string): Promise<any> {
    const url = 'https://apiautomakerhost.serveirc.com/api/v1/2fa/turn-on-qr';
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          { code },
          {
            headers: { Authorization: authorization },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'turnOn2FA');
      throw error;
    }
  }

  // Autenticarse con 2FA
  async authenticate2FA(code: string, authorization: string): Promise<any> {
    const url = 'https://apiautomakerhost.serveirc.com/api/v1/2fa/authenticate';
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          { code },
          {
            headers: { Authorization: authorization },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'authenticate2FA');
      throw error;
    }
  }
}
