// File: src/lessons/lessons.controller.ts

import { Controller, Get, Post, Param, Body, Query, Patch, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // Criar nova aula
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  // Listar todas as aulas, opcionalmente filtrando por sectionId
  @Get()
  findAll(@Query('sectionId') sectionId?: string) {
    const sid = sectionId !== undefined ? parseInt(sectionId, 10) : undefined;
    return this.lessonsService.findAll(sid);
  }

  // Obter detalhes de uma aula pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  // Atualizar uma aula
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  // Remover uma aula
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
