// File: src/purchases/entities/purchase.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn() id: number;
  @Column() userId: number;
  @Column() courseId: number;
  @Column('timestamp') date: Date;
  @Column() status: string;
}
