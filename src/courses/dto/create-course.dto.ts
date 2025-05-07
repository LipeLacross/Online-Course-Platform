// File: src/courses/dto/create-course.dto.ts

export class CreateCourseDto {
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  status: string;  // Ex: "draft" ou "published"
  thumbnailUrl: string;  // URL da thumbnail (imagem do curso)
}
