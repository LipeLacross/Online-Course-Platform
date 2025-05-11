import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn() id: number;
  @Column() userId: number;
  @Column() courseId: number;
  @Column('timestamp') date: Date;
  @Column() status: string;

  @ManyToOne(() => User, u => u.purchases)
  @JoinColumn({ name: 'userId' }) user: User;

  @ManyToOne(() => Course, c => c.students)
  @JoinColumn({ name: 'courseId' }) course: Course;
}