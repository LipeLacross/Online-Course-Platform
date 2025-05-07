// File: src/sections/dto/create-section.dto.ts

export class CreateSectionDto {
  title: string;     // Título da seção
  courseId: number;  // ID do curso ao qual esta seção pertence
  order: number;     // Ordem da seção dentro do curso
}
