// File: src/courses/courses.service.ts

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';  // Certifique-se de que o caminho está correto

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private repo: Repository<Course>,  // Injetando o repositório do Course
  ) {}

  // Método para criar um curso
  create(createDto: Partial<Course>) {
    const course = this.repo.create(createDto); // Cria um novo curso com os dados fornecidos
    return this.repo.save(course); // Salva o curso no banco de dados
  }

  // Método para listar todos os cursos
  findAll() {
    return this.repo.find(); // Retorna todos os cursos
  }

  // Método opcional para retornar os cursos mais recentes no Dashboard
  getTopCourses() {
    return this.repo.find({ order: { id: 'DESC' }, take: 5 }); // Retorna os 5 cursos mais recentes
  }
}
