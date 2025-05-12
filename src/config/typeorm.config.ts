// src/config/typeorm.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { Course } from '../courses/entities/course.entity';
import { Section } from '../sections/entities/section.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { Review } from '../reviews/entities/review.entity';

dotenv.config();

const sslRejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: sslRejectUnauthorized },
  entities: [
    User,
    RefreshToken,
    Course,
    Section,
    Lesson,
    Purchase,
    Review,
  ],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,  // aplica migrations automaticamente
};
