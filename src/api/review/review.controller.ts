import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

//   @Post()
//   create(@Body() createReviewDto: CreateReviewDto) {
//     return this.reviewService.create(createReviewDto);
//   }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
//     return this.reviewService.update(+id, updateReviewDto);
//   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}