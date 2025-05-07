// File: src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';  // Importa o necessário do NestJS
import { CreateUserDto } from './dto/create-user.dto';  // DTO para criação de um usuário
import { UpdateUserDto } from './dto/update-user.dto';  // DTO para atualização de um usuário

interface User {  // Define a estrutura básica de um usuário
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];  // Array para armazenar usuários (simulação de banco de dados)
  private nextId = 1;  // Inicializa o ID do próximo usuário

  // Método para criar um novo usuário
  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: this.nextId++,  // Atribui um novo ID a cada usuário criado
      ...createUserDto,   // Copia as propriedades do DTO para o novo objeto
    };
    this.users.push(user);  // Adiciona o usuário à lista
    return { message: 'Usuário criado com sucesso', user };
  }

  // Método para listar todos os usuários
  findAll() {
    return this.users;
  }

  // Método para encontrar um usuário pelo ID
  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  // Método para atualizar um usuário
  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);  // Encontra o usuário pelo ID
    Object.assign(user, updateUserDto);  // Atualiza as propriedades do usuário
    return { message: 'Usuário atualizado com sucesso', user };
  }

  // Método para remover um usuário
  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);  // Encontra o índice do usuário
    if (index === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    this.users.splice(index, 1);  // Remove o usuário do array
    return { message: 'Usuário removido com sucesso' };
  }
}
