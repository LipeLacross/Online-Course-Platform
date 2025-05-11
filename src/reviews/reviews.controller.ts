import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createDto: CreateReviewDto): Promise<{ message: string; review: Review }> {
    return this.reviewsService.create(createDto);
  }

  @Get()
  findAll(@Query('courseId') courseId?: string): Promise<Review[]> {
    const id = courseId ? parseInt(courseId, 10) : undefined;
    return this.reviewsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateReviewDto,
  ): Promise<{ message: string; review: Review }> {
    return this.reviewsService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.reviewsService.remove(+id);
  }
}