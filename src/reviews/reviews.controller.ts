// File: src/reviews/reviews.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Criar nova avaliação
  @Post()
  create(@Body() createDto: CreateReviewDto) {
    return this.reviewsService.create(createDto);
  }

  // Listar avaliações, opcionalmente filtrando por courseId
  @Get()
  findAll(@Query('courseId') courseId?: string) {
    const id = courseId !== undefined ? parseInt(courseId, 10) : undefined;
    return this.reviewsService.findAll(id);
  }

  // Obter uma avaliação pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  // Atualizar uma avaliação
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(+id, updateDto);
  }

  // Remover uma avaliação
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
