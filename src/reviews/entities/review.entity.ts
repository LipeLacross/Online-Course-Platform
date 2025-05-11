import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn() id: number;
  @Column() userId: number;
  @Column() courseId: number;
  @Column('int') rating: number;
  @Column() comment: string;
  @Column('timestamp') date: Date;

  @ManyToOne(() => User, u => u.reviews)
  @JoinColumn({ name: 'userId' }) user: User;

  @ManyToOne(() => Course, c => c.reviews)
  @JoinColumn({ name: 'courseId' }) course: Course;
}
