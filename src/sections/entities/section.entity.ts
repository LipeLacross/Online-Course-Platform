// File: src/sections/entities/section.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column() courseId: number;
  @Column() order: number;
}
