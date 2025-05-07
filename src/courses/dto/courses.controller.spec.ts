// File: src/courses/courses.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

describe('CoursesController', () => {
  let coursesController: CoursesController;
  let coursesService: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [CoursesService],
    }).compile();

    coursesController = module.get<CoursesController>(CoursesController);
    coursesService = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(coursesController).toBeDefined();
  });

  it('should create a course', async () => {
    const createCourseDto = {
      title: 'Curso Teste',
      description: 'Descrição do curso',
      price: 100,
      category: 'Tecnologia',
      level: 'Iniciante',
      status: 'draft',
      thumbnailUrl: 'http://exemplo.com/thumbnail.jpg',
    };

    const result = { message: 'Curso criado com sucesso', course: { ...createCourseDto, id: 1 } };
    jest.spyOn(coursesService, 'create').mockResolvedValue(result);

    expect(await coursesController.createCourse(createCourseDto)).toEqual(result);
  });

  it('should get all courses', async () => {
    const courses = [];
    jest.spyOn(coursesService, 'findAll').mockResolvedValue(courses);

    expect(await coursesController.getAllCourses()).toEqual(courses);
  });
});
