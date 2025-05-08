// File: src/courses/courses.module.ts

import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importando o TypeOrmModule
import { Course } from './entities/course.entity';  // Importando a entidade Course

@Module({
  imports: [TypeOrmModule.forFeature([Course])],  // Registrando o repositório do Course
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],  // Se for necessário exportar o serviço
})
export class CoursesModule {}
