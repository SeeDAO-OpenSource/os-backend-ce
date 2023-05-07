import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '.prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AttendEventDto } from './dto/attend-event.dto';
import { ReviewEventDto } from './dto/review-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

//   @Post()
//   async create(@Body() createEventDto: CreateEventDto) {
//     return await this.eventService.create(createEventDto);
//   }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return await this.eventService.update(+id, updateEventDto);
  }

//   @Post('register/:id')
//   async registerEvent(@Param('id') eventId: string, @Query('userId') userId: string) {
//     return await this.eventService.registerEvent(+eventId, +userId);
//   }

//   @Post('attend')
//   async attendEvent(@Body() attendEventDto: AttendEventDto) {
//     return await this.eventService.attendEvent(
//       attendEventDto.eventId,
//       attendEventDto.userId,
//       attendEventDto.attendCode,
//     );
//   }

//   @Post('review')
//   async reviewEvent(@Body() reviewEventDto: ReviewEventDto) {
//     return await this.eventService.reviewEvent(reviewEventDto);
//   }

  @Get('interested/:userId')
  async findEventByInterested(@Param('userId') userId: string) {
    return await this.eventService.findEventByInterested(userId);
  }
}
