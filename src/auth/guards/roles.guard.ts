import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../decorators/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, ctx.getHandler()); // Obtém os roles exigidos da metadata
    if (!requiredRoles) return true;  // Se não houver roles exigidos, permite o acesso

    const request = ctx.switchToHttp().getRequest();
    const user = request.user;  // Obtém o usuário da requisição (deve ser adicionado após autenticação)
    return requiredRoles.includes(user.role);  // Verifica se o papel do usuário está nos exigidos
  }
}
