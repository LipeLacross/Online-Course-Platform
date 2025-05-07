// File: src/sections/sections.module.ts

import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';

@Module({
  imports: [],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],  // Para uso em CoursesModule e LessonsModule
})
export class SectionsModule {}
