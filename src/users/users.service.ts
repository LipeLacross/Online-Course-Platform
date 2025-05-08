import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,  // Injeção do repositório
  ) {}

  // Criação de usuário
  async create(dto: CreateUserDto) {
    const user = this.usersRepo.create(dto);  // Cria um novo usuário
    return this.usersRepo.save(user);  // Salva no banco de dados
  }

  // Listar todos os usuários
  findAll() {
    return this.usersRepo.find();
  }

  // Buscar um usuário por ID
  async findOne(id: number) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return user;
  }

  // Buscar usuário por e-mail
  findByEmail(email: string) {
    return this.usersRepo.findOneBy({ email });
  }

  // Atualizar usuário
  async update(id: number, dto: UpdateUserDto) {
    await this.usersRepo.update(id, dto);
    return this.findOne(id);  // Retorna o usuário atualizado
  }

  // Remover usuário
  async remove(id: number) {
    await this.usersRepo.delete(id);
    return { message: 'Usuário removido com sucesso' };
  }

  // Setar avatar para o usuário
  async setAvatar(id: number, url: string) {
    await this.usersRepo.update(id, { avatarUrl: url });
    return this.findOne(id);  // Retorna o usuário atualizado com o avatar
  }
}
