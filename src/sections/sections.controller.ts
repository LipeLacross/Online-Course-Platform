import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';  // Correct import for Section entity

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  // Creates a new section and returns a Promise<Section>
  @Post()
  create(@Body() createDto: CreateSectionDto): Promise<Section> {
    return this.sectionsService.create(createDto);  // Already returns a Promise<Section>
  }

  // Lists all sections, with an optional filter for courseId
  @Get()
  findAll(@Query('courseId') courseId?: string): Promise<Section[]> {
    const cid = courseId !== undefined ? parseInt(courseId, 10) : undefined;
    return this.sectionsService.findAll(cid);  // Already returns a Promise<Section[]>
  }

  // Retrieves a section by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Section> {
    return this.sectionsService.findOne(+id);  // Already returns a Promise<Section>
  }

  // Updates a section by ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSectionDto,
  ): Promise<Section> {
    return this.sectionsService.update(+id, updateDto);  // Already returns a Promise<Section>
  }

  // Removes a section by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.sectionsService.remove(+id);  // Already returns a Promise<{ message: string }>
  }
}
