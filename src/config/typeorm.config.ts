// File: src/config/typeorm.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { Section } from '../sections/entities/section.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { Review } from '../reviews/entities/review.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',  // ou 'db' se estiver usando Docker
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'online_courses',  // Nome do banco de dados
  entities: [
    User,
    Course,
    Section,
    Lesson,
    Purchase,
    Review,
  ],
  synchronize: true,  // Defina como 'false' em produção!
};
