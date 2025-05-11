import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column() courseId: number;
  @Column() order: number;

  @ManyToOne(() => Course, c => c.sections)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @OneToMany(() => Lesson, l => l.section, { cascade: true }) lessons: Lesson[];
}
