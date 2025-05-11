import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Section } from '../../sections/entities/section.entity';
import { Review } from '../../reviews/entities/review.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column() description: string;
  @Column('decimal') price: number;
  @Column() category: string;
  @Column() level: string;
  @Column() status: string;
  @Column() thumbnailUrl: string;

  @OneToMany(() => Section, s => s.course, { cascade: true }) sections: Section[];
  @OneToMany(() => Review, r => r.course) reviews: Review[];

  @ManyToMany(() => User, u => u.purchases)
  @JoinTable({ name: 'purchase' })
  students: User[];
}