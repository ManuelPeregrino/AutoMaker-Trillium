import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { HealthController } from './health/health.controller';
import { TwoFactorAuthController } from './auth/two-factor-auth.controller';

@Module({
  imports: [ServicesModule],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    HealthController,
    TwoFactorAuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
