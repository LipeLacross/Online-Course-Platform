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
  create(createDto: CreateReviewDto): Promise<{ message: string; review: Review }> {
    if (createDto.rating < 1 || createDto.rating > 5) {
      throw new BadRequestException('Rating deve ser entre 1 e 5');
    }

    // Verifica se o usuário já avaliou este curso
    const exists = this.reviews.find(r => r.userId === createDto.userId && r.courseId === createDto.courseId);
    if (exists) {
      throw new BadRequestException('Usuário já avaliou este curso');
    }

    const review: Review = {
      id: this.nextId++,
      ...createDto,
      date: new Date(),
    };

    this.reviews.push(review);
    return Promise.resolve({ message: 'Avaliação criada com sucesso', review });
  }

  // Lista todas as avaliações, ou de um curso específico
  findAll(courseId?: number): Promise<Review[]> {
    if (courseId !== undefined) {
      return Promise.resolve(this.reviews.filter(r => r.courseId === courseId));
    }
    return Promise.resolve(this.reviews);
  }

  // Obtém uma avaliação pelo ID
  async findOne(id: number): Promise<Review> { // Usei async aqui
    const review = this.reviews.find(r => r.id === id);
    if (!review) {
      throw new NotFoundException(`Review com ID ${id} não encontrada`);
    }
    return review;
  }

  // Atualiza uma avaliação
  async update(id: number, updateDto: UpdateReviewDto): Promise<{ message: string; review: Review }> {
    const review = await this.findOne(id);  // Adicionando await aqui para esperar a resolução da Promise

    if (updateDto.rating !== undefined) {
      if (updateDto.rating < 1 || updateDto.rating > 5) {
        throw new BadRequestException('Rating deve ser entre 1 e 5');
      }
      review.rating = updateDto.rating; // Agora 'review' está resolvido, podemos acessar suas propriedades
    }

    if (updateDto.comment !== undefined) {
      review.comment = updateDto.comment;
    }

    return Promise.resolve({ message: 'Avaliação atualizada com sucesso', review });
  }

  // Remove uma avaliação
  remove(id: number): Promise<{ message: string }> {
    const index = this.reviews.findIndex(r => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Review com ID ${id} não encontrada`);
    }
    this.reviews.splice(index, 1);
    return Promise.resolve({ message: 'Avaliação removida com sucesso' });
  }

  // Calcula a média de rating de um curso (para uso no Dashboard)
  getAverageRating(courseId: number): number {
    const courseReviews = this.reviews.filter(r => r.courseId === courseId);
    if (courseReviews.length === 0) return 0;
    const sum = courseReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / courseReviews.length;
  }
}
