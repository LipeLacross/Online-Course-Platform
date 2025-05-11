// src/lessons/lessons.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Lesson } from './entities/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),  // torna LessonRepository disponível
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
