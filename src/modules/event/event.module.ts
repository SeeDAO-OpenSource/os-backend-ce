import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from '../../prisma/service';

@Module({
  providers: [EventService, PrismaService],
  controllers: [EventController],
})
export class EventModule {}