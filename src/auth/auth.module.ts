import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,  // Módulo de usuários (onde o serviço de usuários é implementado)
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',  // Coloque uma chave secreta segura aqui
      signOptions: { expiresIn: '1h' },  // Defina a expiração do token
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
