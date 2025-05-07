// File: src/lessons/dto/create-lesson.dto.ts

export class CreateLessonDto {
  title: string;
  description: string;
  videoUrl: string;     // URL do vídeo ou link YouTube/Vimeo
  sectionId: number;    // ID da seção à qual esta aula pertence
}
