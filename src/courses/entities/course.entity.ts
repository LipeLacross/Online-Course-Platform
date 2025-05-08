import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  @Column()
  level: string;

  @Column()
  status: string;  // Ex: "draft" ou "published"

  @Column()
  thumbnailUrl: string;  // URL da thumbnail (imagem do curso)
}
