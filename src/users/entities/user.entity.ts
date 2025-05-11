import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from '../../purchases/entities/purchase.entity';
import { Review } from '../../reviews/entities/review.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ unique: true }) email: string;
  @Column() password: string;
  @Column() role: string;
  @Column({ nullable: true }) avatarUrl?: string;

  @OneToMany(() => Purchase, p => p.user) purchases: Purchase[];
  @OneToMany(() => Review, r => r.user) reviews: Review[];
  @OneToMany(() => RefreshToken, rt => rt.user) refreshTokens: RefreshToken[];
}
