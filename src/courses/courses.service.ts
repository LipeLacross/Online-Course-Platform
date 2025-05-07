import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  private courses = []; // Simulação de um banco de dados (um array de cursos)

  // Método para criar um novo curso
  create(createCourseDto: CreateCourseDto) {
    const newCourse = {
      id: this.courses.length + 1,  // Gerar um ID simples para o novo curso
      ...createCourseDto,           // Adicionar os dados do curso
    };
    this.courses.push(newCourse);
    return { message: 'Curso criado com sucesso', course: newCourse };
  }

  // Método para listar todos os cursos
  findAll() {
    return this.courses;
  }
}
