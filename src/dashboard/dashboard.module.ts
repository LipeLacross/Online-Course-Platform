// File: src/dashboard/dashboard.module.ts

import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';
import { PurchasesModule } from '../purchases/purchases.module';

@Module({
  imports: [CoursesModule, UsersModule, PurchasesModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
