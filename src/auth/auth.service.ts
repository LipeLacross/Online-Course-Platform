import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(RefreshToken) private rtRepo: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  // Novo método de registro
  async register(dto: CreateUserDto) {
    const exists = await this.usersRepo.findOneBy({ email: dto.email });
    if (exists) throw new UnauthorizedException('Email já registrado');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ ...dto, password: hash });
    await this.usersRepo.save(user);

    return this.generateTokens(user);
  }

  // Novo método de login
  async login(dto: LoginUserDto) {
    const user = await this.usersRepo.findOneBy({ email: dto.email });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    return this.generateTokens(user);
  }

  private async saveRefreshToken(user: User, token: string, expiresIn: number) {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const entity = this.rtRepo.create({ user, token, expiresAt });
    await this.rtRepo.save(entity);
  }

  async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh = this.jwtService.sign(payload, { expiresIn: '7d' });
    const decoded = this.jwtService.decode(refresh) as any;
    await this.saveRefreshToken(user, refresh, decoded.exp - decoded.iat);
    return { access_token: access, refresh_token: refresh };
  }

  async refreshTokens(token: string) {
    const stored = await this.rtRepo.findOne({ where: { token }, relations: ['user'] });
    if (!stored || stored.expiresAt < new Date())
      throw new UnauthorizedException('Refresh token inválido');
    await this.rtRepo.delete(stored.id);
    return this.generateTokens(stored.user);
  }

  async logout(token: string) {
    await this.rtRepo.delete({ token });
    return { message: 'Logged out' };
  }
}
