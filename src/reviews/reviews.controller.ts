// File: src/reviews/reviews.controller.ts

import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';  // Importando a entidade Review

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Criar nova avaliação
  @Post()
  create(@Body() createDto: CreateReviewDto): Promise<{ message: string; review: Review }> {
    return this.reviewsService.create(createDto);  // Agora retorna Promise<{ message: string; review: Review }>
  }

  // Listar avaliações, opcionalmente filtrando por courseId
  @Get()
  findAll(@Query('courseId') courseId?: string): Promise<Review[]> {
    const id = courseId !== undefined ? parseInt(courseId, 10) : undefined;
    return this.reviewsService.findAll(id);  // Retorna Promise<Review[]>
  }

  // Obter uma avaliação pelo ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(+id);  // Retorna Promise<Review>
  }

  // Atualizar uma avaliação
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateReviewDto,
  ): Promise<{ message: string; review: Review }> {
    return this.reviewsService.update(+id, updateDto);  // Retorna Promise<{ message: string; review: Review }>
  }

  // Remover uma avaliação
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.reviewsService.remove(+id);  // Retorna Promise<{ message: string }>
  }
}
