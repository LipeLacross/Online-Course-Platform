// File: src/lessons/entities/lesson.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column() description: string;
  @Column() videoUrl: string;
  @Column() sectionId: number;
}
