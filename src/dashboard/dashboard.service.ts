import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  create(course: any) {
    // Lógica para criar curso
    return { message: 'Curso criado com sucesso' };
  }

  findAll() {
    // Lógica para listar todos os cursos
    return [];
  }
}
