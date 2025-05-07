// File: src/reviews/reviews.module.ts

import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService], // Exporta para uso em outros módulos (Dashboard)
})
export class ReviewsModule {}
