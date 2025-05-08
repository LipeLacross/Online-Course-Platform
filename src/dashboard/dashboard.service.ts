// File: src/dashboard/dashboard.service.ts

import { Injectable } from '@nestjs/common';
import { CoursesService } from '../courses/courses.service';
import { UsersService } from '../users/users.service';
import { PurchasesService } from '../purchases/purchases.service';

@Injectable()
export class DashboardService {
  constructor(
    private courses: CoursesService,
    private users: UsersService,
    private purchases: PurchasesService,
  ) {}

  getInstructorStats() {
    return {
      totalCourses: this.courses.findAll().then(c => c.length),
      totalStudents: this.users.findAll().then(u => u.length),
      averageRating: this.purchases.getAverageCourseRating(),
    };
  }

  getAdminStats() {
    return {
      totalUsers: this.users.findAll().then(u => u.length),
      totalSales: this.purchases.getTotalSales(),
      topCourses: this.courses.getTopCourses(),
    };
  }
}
