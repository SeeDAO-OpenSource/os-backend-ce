import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';
import { Review } from '@prisma/client';
import { ReviewCreateInput, ReviewUpdateInput } from './review.interface';


@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

//   async create(data: CreateReviewDto): Promise<Review> {
//     const prismaData: ReviewCreateInput = {
//       // map the properties from data to the expected properties for Prisma
//     //   tags: data.tags,
//       comment: data.comment,
//       targetCollection: data.targetCollection,
//       targetId: data.targetId,  
//       max: data.max,
//       min: data.min,
//       value: data.value,
//       eventId: data.eventId,
//       toId: data.toId,
//       fromId: data.fromId,
//     };
//     return this.prisma.review.create({ data: prismaData });
//   }
  async findAll(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async findOne(id: number): Promise<Review | null> {
    return this.prisma.review.findUnique({ where: { id } });
  }

//   async update(id: number, data: UpdateReviewDto): Promise<Review> {
//     const prismaData: ReviewUpdateInput = {
//       // map the properties from data to the expected properties for Prisma
//     //   tags: data.tags,
//       comment: data.comment,
//       targetCollection: data.targetCollection,
//       targetId: data.targetId,  
//       max: data.max,
//       min: data.min,
//       value: data.value,
//       eventId: data.eventId,
//       toId: data.toId,
//       fromId: data.fromId,
//     };
//     return this.prisma.review.update({ where: { id }, data: prismaData });
//   }  

  async remove(id: number): Promise<Review> {
    return this.prisma.review.delete({ where: { id } });
  }
}