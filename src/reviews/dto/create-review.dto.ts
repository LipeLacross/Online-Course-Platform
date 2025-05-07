// File: src/reviews/dto/create-review.dto.ts

export class CreateReviewDto {
  userId: number;     // ID do aluno que fez a avaliação
  courseId: number;   // ID do curso avaliado
  rating: number;     // Nota de 1 a 5
  comment: string;    // Comentário da avaliação
}
