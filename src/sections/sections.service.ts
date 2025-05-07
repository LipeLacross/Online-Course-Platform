// File: src/sections/sections.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

interface Section {
  id: number;
  title: string;
  courseId: number;
  order: number;
}

@Injectable()
export class SectionsService {
  private sections: Section[] = [];
  private nextId = 1;

  // Cria uma nova seção
  create(createDto: CreateSectionDto) {
    const section: Section = {
      id: this.nextId++,
      ...createDto,
    };
    this.sections.push(section);
    return { message: 'Seção criada com sucesso', section };
  }

  // Lista todas as seções, opcionalmente filtrando por curso
  findAll(courseId?: number) {
    if (courseId !== undefined) {
      return this.sections.filter(s => s.courseId === courseId);
    }
    return this.sections;
  }

  // Obtém uma seção pelo ID
  findOne(id: number) {
    const section = this.sections.find(s => s.id === id);
    if (!section) {
      throw new NotFoundException(`Seção com ID ${id} não encontrada`);
    }
    return section;
  }

  // Atualiza uma seção existente
  update(id: number, updateDto: UpdateSectionDto) {
    const section = this.findOne(id);
    Object.assign(section, updateDto);
    return { message: 'Seção atualizada com sucesso', section };
  }

  // Remove uma seção
  remove(id: number) {
    const idx = this.sections.findIndex(s => s.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Seção com ID ${id} não encontrada`);
    }
    this.sections.splice(idx, 1);
    return { message: 'Seção removida com sucesso' };
  }
}
