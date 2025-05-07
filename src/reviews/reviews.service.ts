// File: src/reviews/reviews.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

interface Review {
  id: number;
  userId: number;
  courseId: number;
  rating: number;
  comment: string;
  date: Date;
}

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [];
  private nextId = 1;

  // Cria uma nova avaliação
  create(createDto: CreateReviewDto) {
    if (createDto.rating < 1 || createDto.rating > 5) {
      throw new BadRequestException('Rating deve ser entre 1 e 5');
    }
    // Verifica se o usuário já avaliou este curso
    const exists = this.reviews.find(r =>
      r.userId === createDto.userId && r.courseId === createDto.courseId);
    if (exists) {
      throw new BadRequestException('Usuário já avaliou este curso');
    }
    const review: Review = {
      id: this.nextId++,
      ...createDto,
      date: new Date(),
    };
    this.reviews.push(review);
    return { message: 'Avaliação criada com sucesso', review };
  }

  // Lista todas as avaliações, ou de um curso específico
  findAll(courseId?: number) {
    if (courseId !== undefined) {
      return this.reviews.filter(r => r.courseId === courseId);
    }
    return this.reviews;
  }

  // Obtém uma avaliação pelo ID
  findOne(id: number) {
    const review = this.reviews.find(r => r.id === id);
    if (!review) {
      throw new NotFoundException(`Review com ID ${id} não encontrada`);
    }
    return review;
  }

  // Atualiza uma avaliação
  update(id: number, updateDto: UpdateReviewDto) {
    const review = this.findOne(id);
    if (updateDto.rating !== undefined) {
      if (updateDto.rating < 1 || updateDto.rating > 5) {
        throw new BadRequestException('Rating deve ser entre 1 e 5');
      }
      review.rating = updateDto.rating;
    }
    if (updateDto.comment !== undefined) {
      review.comment = updateDto.comment;
    }
    return { message: 'Avaliação atualizada com sucesso', review };
  }

  // Remove uma avaliação
  remove(id: number) {
    const index = this.reviews.findIndex(r => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Review com ID ${id} não encontrada`);
    }
    this.reviews.splice(index, 1);
    return { message: 'Avaliação removida com sucesso' };
  }

  // Calcula a média de rating de um curso (para uso no Dashboard)
  getAverageRating(courseId: number) {
    const courseReviews = this.reviews.filter(r => r.courseId === courseId);
    if (courseReviews.length === 0) return 0;
    const sum = courseReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / courseReviews.length;
  }
}
