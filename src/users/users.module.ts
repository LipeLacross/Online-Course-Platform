// File: src/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';  // A entidade User
import { UsersService } from './users.service';  // O serviço de usuários
import { UsersController } from './users.controller';  // O controlador de usuários

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Garantindo que o repositório User esteja disponível
  controllers: [UsersController],  // Controlador de usuários
  providers: [UsersService],  // Serviço de usuários
  exports: [UsersService],  // Exportando para outros módulos, como o AuthModule
})
export class UsersModule {}

