import { Controller, Get, Post, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';  // DTO para validação do corpo da requisição

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Rota para criar um novo curso
  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  // Rota para listar todos os cursos
  @Get()
  getAllCourses() {
    return this.coursesService.findAll();
  }
}
