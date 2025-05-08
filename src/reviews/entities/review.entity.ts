// File: src/reviews/entities/review.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn() id: number;
  @Column() userId: number;
  @Column() courseId: number;
  @Column('int') rating: number;
  @Column() comment: string;
  @Column('timestamp') date: Date;
}
