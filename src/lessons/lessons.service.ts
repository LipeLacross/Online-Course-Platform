// File: src/lessons/lessons.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';  // DTO para criação de uma aula
import { UpdateLessonDto } from './dto/update-lesson.dto';  // DTO para atualização de uma aula

interface Lesson {  // Define a estrutura básica de uma aula
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  sectionId: number;
}

@Injectable()
export class LessonsService {
  private lessons: Lesson[] = [];  // Array para armazenar as aulas (simulação de banco de dados)
  private nextId = 1;  // Inicializa o ID da próxima aula

  // Método para criar uma nova aula
  create(createLessonDto: CreateLessonDto) {
    const lesson: Lesson = {
      id: this.nextId++,  // Atribui um novo ID à aula
      ...createLessonDto,  // Copia as propriedades do DTO para a nova aula
    };
    this.lessons.push(lesson);  // Adiciona a aula ao array
    return { message: 'Aula criada com sucesso', lesson };
  }

  // Método para listar todas as aulas (com filtro por seção, se fornecido)
  findAll(sectionId?: number) {
    if (sectionId !== undefined) {
      return this.lessons.filter(lesson => lesson.sectionId === sectionId);  // Filtra aulas pela seção
    }
    return this.lessons;  // Retorna todas as aulas
  }

  // Método para encontrar uma aula pelo ID
  findOne(id: number) {
    const lesson = this.lessons.find(l => l.id === id);  // Encontra a aula pelo ID
    if (!lesson) {
      throw new NotFoundException(`Aula com ID ${id} não encontrada`);
    }
    return lesson;  // Retorna a aula encontrada
  }

  // Método para atualizar uma aula existente
  update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = this.findOne(id);  // Encontra a aula pelo ID
    Object.assign(lesson, updateLessonDto);  // Atualiza a aula com os dados fornecidos
    return { message: 'Aula atualizada com sucesso', lesson };
  }

  // Método para remover uma aula
  remove(id: number) {
    const index = this.lessons.findIndex(l => l.id === id);  // Encontra o índice da aula
    if (index === -1) {
      throw new NotFoundException(`Aula com ID ${id} não encontrada`);
    }
    this.lessons.splice(index, 1);  // Remove a aula do array
    return { message: 'Aula removida com sucesso' };
  }
}
