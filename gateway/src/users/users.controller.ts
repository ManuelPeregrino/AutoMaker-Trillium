import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ServicesService } from '../services/services.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllUsers(@Headers('authorization') authorization: string) {
    this.logger.log(
      `Intentando obtener todos los usuarios. Token: ${authorization}`,
    );
    try {
      const response = await this.servicesService.getAllUsers(authorization);
      this.logger.log('Usuarios obtenidos exitosamente');
      return response;
    } catch (error) {
      this.logger.error('Error al obtener usuarios', error);

      if (error.response) {
        this.logger.error('Detalles del error de respuesta:', {
          status: error.response.status,
          data: error.response.data,
        });

        throw new HttpException(
          {
            message:
              error.response.data?.message || 'Error al obtener usuarios',
            originalError: error.response.data,
            status: error.response.status,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error.request) {
        this.logger.error('No se recibió respuesta del servidor');
        throw new HttpException(
          'No se recibió respuesta del servidor',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        this.logger.error('Error al configurar la solicitud', error.message);
        throw new HttpException(
          'Error al configurar la solicitud',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post()
  async createUser(
    @Body() userDto: any,
    @Headers('authorization') authorization: string,
  ) {
    this.logger.log(`Intentando crear usuario. Token: ${authorization}`);
    try {
      const response = await this.servicesService.createUser(
        userDto,
        authorization,
      );
      this.logger.log('Usuario creado exitosamente');
      return response;
    } catch (error) {
      this.logger.error('Error al crear usuario', error);

      if (error.response) {
        this.logger.error('Detalles del error de respuesta:', {
          status: error.response.status,
          data: error.response.data,
        });

        throw new HttpException(
          {
            message: error.response.data?.message || 'Error al crear usuario',
            originalError: error.response.data,
            status: error.response.status,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error.request) {
        this.logger.error('No se recibió respuesta del servidor');
        throw new HttpException(
          'No se recibió respuesta del servidor',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        this.logger.error('Error al configurar la solicitud', error.message);
        throw new HttpException(
          'Error al configurar la solicitud',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    this.logger.log(
      `Intentando obtener usuario por ID: ${id}. Token: ${authorization}`,
    );
    try {
      const response = await this.servicesService.getUserById(
        id,
        authorization,
      );
      this.logger.log('Usuario obtenido exitosamente');
      return response;
    } catch (error) {
      this.logger.error(`Error al obtener usuario con ID ${id}`, error);

      if (error.response) {
        this.logger.error('Detalles del error de respuesta:', {
          status: error.response.status,
          data: error.response.data,
        });

        throw new HttpException(
          {
            message: error.response.data?.message || 'Error al obtener usuario',
            originalError: error.response.data,
            status: error.response.status,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error.request) {
        this.logger.error('No se recibió respuesta del servidor');
        throw new HttpException(
          'No se recibió respuesta del servidor',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        this.logger.error('Error al configurar la solicitud', error.message);
        throw new HttpException(
          'Error al configurar la solicitud',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: any,
    @Headers('authorization') authorization: string,
  ) {
    this.logger.log(
      `Intentando actualizar usuario con ID: ${id}. Token: ${authorization}`,
    );
    try {
      const response = await this.servicesService.updateUser(
        id,
        updateUserDto,
        authorization,
      );
      this.logger.log('Usuario actualizado exitosamente');
      return response;
    } catch (error) {
      this.logger.error(`Error al actualizar usuario con ID ${id}`, error);

      if (error.response) {
        this.logger.error('Detalles del error de respuesta:', {
          status: error.response.status,
          data: error.response.data,
        });

        throw new HttpException(
          {
            message:
              error.response.data?.message || 'Error al actualizar usuario',
            originalError: error.response.data,
            status: error.response.status,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error.request) {
        this.logger.error('No se recibió respuesta del servidor');
        throw new HttpException(
          'No se recibió respuesta del servidor',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        this.logger.error('Error al configurar la solicitud', error.message);
        throw new HttpException(
          'Error al configurar la solicitud',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    this.logger.log(
      `Intentando eliminar usuario con ID: ${id}. Token: ${authorization}`,
    );
    try {
      const response = await this.servicesService.deleteUser(id, authorization);
      this.logger.log('Usuario eliminado exitosamente');
      return response;
    } catch (error) {
      this.logger.error(`Error al eliminar usuario con ID ${id}`, error);

      if (error.response) {
        this.logger.error('Detalles del error de respuesta:', {
          status: error.response.status,
          data: error.response.data,
        });

        throw new HttpException(
          {
            message:
              error.response.data?.message || 'Error al eliminar usuario',
            originalError: error.response.data,
            status: error.response.status,
          },
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error.request) {
        this.logger.error('No se recibió respuesta del servidor');
        throw new HttpException(
          'No se recibió respuesta del servidor',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else {
        this.logger.error('Error al configurar la solicitud', error.message);
        throw new HttpException(
          'Error al configurar la solicitud',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
