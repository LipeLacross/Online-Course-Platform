// File: src/sections/sections.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  // Cria nova seção
  @Post()
  create(@Body() createDto: CreateSectionDto) {
    return this.sectionsService.create(createDto);
  }

  // Lista todas as seções, com filtro opcional por courseId
  @Get()
  findAll(@Query('courseId') courseId?: string) {
    const cid = courseId !== undefined ? parseInt(courseId, 10) : undefined;
    return this.sectionsService.findAll(cid);
  }

  // Detalha uma seção
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(+id);
  }

  // Atualiza uma seção
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(+id, updateDto);
  }

  // Remove uma seção
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(+id);
  }
}
