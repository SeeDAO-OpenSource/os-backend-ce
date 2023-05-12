import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification, Prisma } from '@prisma/client';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() data: Prisma.NotificationCreateInput): Promise<Notification> {
    return this.notificationService.create(data);
  }

  @Get()
  findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.NotificationUpdateInput): Promise<Notification> {
    return this.notificationService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.delete(+id);
  }
}