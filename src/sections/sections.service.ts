// importar InjectRepository e Repository e substituir lógica in-memory por repo.find, repo.save, etc.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(@InjectRepository(Section) private sectionRepo: Repository<Section>) {}

  create(dto: CreateSectionDto): Promise<Section> {
    const sec = this.sectionRepo.create(dto);
    return this.sectionRepo.save(sec);
  }

  findAll(courseId?: number): Promise<Section[]> {
    const opts = courseId ? { where: { courseId } } : {};
    return this.sectionRepo.find(opts);
  }

  async findOne(id: number): Promise<Section> {
    const sec = await this.sectionRepo.findOneBy({ id });
    if (!sec) throw new NotFoundException('Section not found');
    return sec;
  }

  async update(id: number, dto: UpdateSectionDto): Promise<Section> {
    await this.sectionRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.sectionRepo.delete(id);
    return { message: 'Section removed' };
  }
}