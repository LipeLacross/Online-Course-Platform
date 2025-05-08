// File: src/dashboard/dashboard.module.ts

import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';
import { PurchasesModule } from '../purchases/purchases.module';

@Module({
  imports: [CoursesModule, UsersModule, PurchasesModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}

