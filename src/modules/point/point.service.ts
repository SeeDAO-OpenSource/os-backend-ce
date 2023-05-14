import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service';
import { CreatePointRecordDto } from './point.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PointService {
  constructor(private prisma: PrismaService) {}

  // async createPointRecords(records: CreatePointRecordDto[]): Promise<any> {
  //     const createdRecords = await Promise.all(
  //       records.map(async (record) => {
  //         const { links, ...rest } = record;
  //         const beneficiary = await this.createUserIfNotExist(rest.wallet);
          
  //         const createdLinks = links
  //           ? await Promise.all(
  //               links.map((link) => this.prisma.link.create({ data: link })),
  //             )
  //           : [];
  //         return this.prisma.point.create({
  //           data: {
  //             ...rest,
  //             beneficiaryId: beneficiary.id,
  //             links: {
  //               create: createdLinks,
  //             },
  //              budget: {
  //               connect: {
  //                 id: rest.budgetId,
  //               },
  //             },
  //           } as Prisma.PointCreateInput,
  //         });
  //       }),
  //     );
  //     return createdRecords;
    
  // }

  async findPointRecordsByCreator(creatorId: string): Promise<any> {
      return await this.prisma.point.findMany({
        where: { creatorId },
      });
  }

  async findPointRecordById(id: string): Promise<any> {
      return await this.prisma.point.findUnique({
        where: { id },
      });
  }

  async findAllPointRecords(offset: number, limit: number): Promise<any> {
      return await this.prisma.point.findMany({
        take: limit,
        skip: offset,
      });
  
  }

  async queryPointRecords(query: any, offset: number, limit: number): Promise<any> {
      let search = query;
      const where = {};

      if (!search || search.filter === '' || search.condition === '') {
        return await this.findAllPointRecords(offset, limit);
      } else if (search.filter === 'creator' || search.filter === 'beneficiary') {
        where[search.filter + 'Id'] = search.condition;
      } else if (search.filter === 'status') {
        where[search.filter] = search.condition;
      }

      return await this.prisma.point.findMany({
        where,
        take: limit,
        skip: offset,
      });
   
  }

  // async createUserIfNotExist(wallet: string): Promise<any> {
  //     let user = await this.prisma.user.findUnique({
  //       where: { wallet },
  //     });

  //     if (!user) {
  //       user = await this.prisma.user.create({
  //         data: { wallet },
  //       });
  //     }

  //     return user;
  // }
}