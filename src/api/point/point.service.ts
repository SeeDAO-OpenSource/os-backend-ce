import { Injectable } from '@nestjs/common';
import { PrismaClient, Point } from '.prisma/client';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Injectable()
export class PointService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPoint(data: Omit<Point, 'id'>): Promise<Point> {
    return this.prisma.point.create({ data });
  }

  async getPointById(id: string): Promise<Point | null> {
    return this.prisma.point.findUnique({ where: { id } });
  }

  async updatePoint(id: string, data: Partial<Point>): Promise<Point> {
    return this.prisma.point.update({ where: { id }, data });
  }

  async deletePoint(id: string): Promise<Point> {
    return this.prisma.point.delete({ where: { id } });
  }


//   async findPointRecordById(id: string) {
//     // Implement this method with Prisma or another database library
//   }

//   async createUserIfNotExist(wallet: string) {
//     // Implement this method with Prisma or another database library
//   }

//   async createPointRecords(records: any[]) {
//     // Implement this method with Prisma or another database library
//   }

//   async queryPointRecords(search: any, offset: number, limit: number) {
//     // Implement this method with Prisma or another database library
//   }

//   async findAllPointRecords(offset: number, limit: number) {
//     // Implement this method with Prisma or another database library
//   }

//   async findPointRecordsById(ids: string[]) {
//     // Implement this method with Prisma or another database library
//   }

//   async findPointRecordsByCreator(creatorId: string) {
//     // Implement this method with Prisma or another database library
//   }

}
