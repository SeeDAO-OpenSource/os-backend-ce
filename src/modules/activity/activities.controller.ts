import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';import { ActivitiesService } from './activities.service';
import { Activity } from '@prisma/client';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async findAll(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Activity> {
    return this.activitiesService.findOne(id);
  }

  @Post()
  async create(@Body() activity: Omit<Activity, 'id'>): Promise<Activity> {
    return this.activitiesService.create(activity);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedActivity: Omit<Activity, 'id'>): Promise<Activity> {
    return this.activitiesService.update(id, updatedActivity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.activitiesService.delete(id);
  }

  @Get('upcoming')
  async getUpcomingActivity(): Promise<Activity[]> {
    return this.activitiesService.getUpcomingActivity();
  }

//   @Post('checkin/:activityId')
//   async checkinActivity(
//     @Param('activityId') activityId: string,
//     @Body('checkinCode') checkinCode: string,
//     @Body('wallet') wallet: string,
//   ): Promise<{ isChecked: boolean; result: Record<string, any> }> {
//     if (!activityId || !checkinCode || !wallet) {
//       throw new BadRequestException('Missing required parameters');
//     }

//     try {
//       return await this.activitiesService.checkinActivity(activityId, checkinCode, wallet);
//     } catch (error) {
//       throw new NotFoundException('Activity not found');
//     }
//   }

}
