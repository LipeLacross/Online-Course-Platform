import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  imports: [],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService], // Se for necessário exportar o serviço
})
export class CoursesModule {}
