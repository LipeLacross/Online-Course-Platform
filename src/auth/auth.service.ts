import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';  // Para comparar senhas

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,  // Injeção do UserRepository
    private jwtService: JwtService,  // Para criar tokens JWT
  ) {}

  // Registro de novo usuário
  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userExists = await this.usersRepository.findOne({ where: { email } });

    if (userExists) {
      throw new UnauthorizedException('Email já registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);
    return this.login(createUserDto);
  }

  // Login de usuário - Geração de JWT
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }

  // Função para verificar se o usuário está autenticado via JWT
  async validateUser(payload: { email: string; sub: number }) {
    const user = await this.usersRepository.findOne({ where: { email: payload.email } });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return user;
  }
}
