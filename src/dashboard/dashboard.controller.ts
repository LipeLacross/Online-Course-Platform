// File: src/dashboard/dashboard.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/decorators/role.enum';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Rota protegida para instrutores, que retorna as estatísticas dos cursos
  @Get('instructor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)  // Só pode acessar se for instrutor
  getInstructorStats() {
    return this.dashboardService.getInstructorStats();
  }

  // Rota protegida para administradores, que retorna as estatísticas gerais
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)  // Só pode acessar se for admin
  getAdminStats() {
    return this.dashboardService.getAdminStats();
  }
}
