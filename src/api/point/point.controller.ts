import { Controller, Get, Post, Body, Param, Put, Delete ,  UseGuards } from '@nestjs/common';
import { PointService } from './point.service';
import { Point } from '.prisma/client';

@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  async createPoint(@Body() data: Omit<Point, 'id'>): Promise<Point> {
    return this.pointService.createPoint(data);
  }

  @Get(':id')
  async getPointById(@Param('id') id: string): Promise<Point> {
    return this.pointService.getPointById(id);
  }

  @Put(':id')
  async updatePoint(@Param('id') id: string, @Body() data: Partial<Point>): Promise<Point> {
    return this.pointService.updatePoint(id, data);
  }

  @Delete(':id')
  async deletePoint(@Param('id') id: string): Promise<Point> {
    return this.pointService.deletePoint(id);
  }


//   @UseGuards(JwtAuthGuard)
//   @Get(':id')
//   async findPointRecordById(@Param('id') id: string) {
//     return await this.pointService.findPointRecordById(id);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('create')
//   async createPointRecords(@Body() records: any[]) {
//     return await this.pointService.createPointRecords(records);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('search')
//   async queryPointRecords(
//     @Query('search') search: any,
//     @Query('offset') offset: number,
//     @Query('limit') limit: number,
//   ) {
//     return await this.pointService.queryPointRecords(search, offset, limit);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('all')
//   async findAllPointRecords(
//     @Query('offset') offset: number,
//     @Query('limit') limit: number,
//   ) {
//     return await this.pointService.findAllPointRecords(offset, limit);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('records/:creatorId')
//   async findPointRecordsByCreator(@Param('creatorId') creatorId: string) {
//     return await this.pointService.findPointRecordsByCreator(creatorId);
//   }

}
