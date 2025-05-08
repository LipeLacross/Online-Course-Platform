import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionsService {
  private sections: Section[] = [];
  private nextId = 1;

  // Ensure that create method returns a Promise<Section>
  create(createDto: CreateSectionDto): Promise<Section> {
    const section = new Section();
    section.id = this.nextId++;
    Object.assign(section, createDto);
    this.sections.push(section);
    return Promise.resolve(section); // Wrap return in Promise.resolve
  }

  // Ensure findAll returns Promise<Section[]> (array of sections)
  findAll(courseId?: number): Promise<Section[]> {
    if (courseId) {
      return Promise.resolve(this.sections.filter(section => section.courseId === courseId));
    }
    return Promise.resolve(this.sections); // Wrap return in Promise.resolve
  }

  // Ensure findOne returns Promise<Section>
  findOne(id: number): Promise<Section> {
    const section = this.sections.find(s => s.id === id);
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return Promise.resolve(section); // Wrap return in Promise.resolve
  }

  // Ensure update method returns Promise<Section>
  update(id: number, updateDto: UpdateSectionDto): Promise<Section> {
    const section = this.findOne(id);  // Will throw error if section not found
    Object.assign(section, updateDto);
    return Promise.resolve(section); // Wrap return in Promise.resolve
  }

  // Ensure remove method returns Promise<{ message: string }>
  remove(id: number): Promise<{ message: string }> {
    const index = this.sections.findIndex(s => s.id === id);
    if (index === -1) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    this.sections.splice(index, 1);
    return Promise.resolve({ message: 'Section removed successfully' }); // Wrap return in Promise.resolve
  }
}
