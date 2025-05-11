import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  async create(createDto: CreateReviewDto): Promise<{ message: string; review: Review }> {
    if (createDto.rating < 1 || createDto.rating > 5) {
      throw new BadRequestException('Rating deve ser entre 1 e 5');
    }
    const exists = await this.reviewRepo.findOne({
      where: { userId: createDto.userId, courseId: createDto.courseId },
    });
    if (exists) throw new BadRequestException('Usuário já avaliou este curso');

    const review = this.reviewRepo.create({
      ...createDto,
      date: new Date(),
    });
    const saved = await this.reviewRepo.save(review);
    return { message: 'Avaliação criada com sucesso', review: saved };
  }

  findAll(courseId?: number): Promise<Review[]> {
    return this.reviewRepo.find({
      where: courseId ? { courseId } : {},
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOneBy({ id });
    if (!review) throw new NotFoundException(`Review com ID ${id} não encontrada`);
    return review;
  }

  async update(
    id: number,
    updateDto: UpdateReviewDto,
  ): Promise<{ message: string; review: Review }> {
    const review = await this.findOne(id);
    if (updateDto.rating !== undefined) {
      if (updateDto.rating < 1 || updateDto.rating > 5) {
        throw new BadRequestException('Rating deve ser entre 1 e 5');
      }
      review.rating = updateDto.rating;
    }
    if (updateDto.comment !== undefined) review.comment = updateDto.comment;
    const updated = await this.reviewRepo.save(review);
    return { message: 'Avaliação atualizada com sucesso', review: updated };
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.reviewRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Review com ID ${id} não encontrada`);
    return { message: 'Avaliação removida com sucesso' };
  }
}