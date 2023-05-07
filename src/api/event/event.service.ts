import { Injectable, NotFoundException  } from '@nestjs/common';
import {
    PrismaService
} from '../prisma.service';
import { Event } from '.prisma/client';
import * as eventUtils from './event.utils';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async findOne(id: number): Promise<Event> {
    return this.prisma.event.findUnique({ where: { id } });
  }

//   async create(data: CreateEventDto): Promise<Event> {
//     return this.prisma.event.create({ data });
//   }

  async update(id: number, data: UpdateEventDto): Promise<Event> {
    return this.prisma.event.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Event> {
    return this.prisma.event.delete({ where: { id } });
  }

  async findEventByInterested(userId: string): Promise<Event[]> {
    try {
      const event = await this.prisma.event.findMany({
        where: { interested: { some: { id: userId } } },
      });
      return event;
    } catch (error) {
      console.log('error:', error);
      throw error;
    }
  }

  
//   async registerEvent(eventId: number, userId: number) {
//     const event = this.prisma.event.findUnique({ where: { id: eventId } });
//     if (!event) {
//       throw new NotFoundException(`Event with ID ${eventId} not found`);
//     }

//     // Add your own logic to register the user for the event.
//     // For example, you can create a new "registrations" array property in the event object,
//     // and then add the userId to that array.
//     if (!event.registrations) {
//       event.registrations = [];
//     }
//     event.registrations.push(userId);

//     return {
//       message: `User with ID ${userId} has been registered for the event with ID ${eventId}`,
//       event: event,
//     };
//   }

//   async getOnGoingEvents(select?: any): Promise<PrismaEvent[]> {
//     try {
//       let notclosed = await this.getNotClosedEvents(select);
//       if (!notclosed) {
//         return [];
//       }
//       return notclosed.filter(
//         (event) =>
//           event.start <= new Date().getTime() &&
//           eventUtils.getEndtime(event.start, event.duration).getTime() >
//             new Date().getTime(),
//       );
//     } catch (error) {
//       console.log('error:', error);
//       throw error;
//     }
//   }

//   async attendEvent(
//     eventId: number,
//     userId: string,
//     attendCode: string,
//   ): Promise<PrismaEvent> {
//     try {
//       const event = await this.prisma.event.findUnique({
//         where: { id: eventId },
//       });
//       if (event.attendCode !== attendCode) return null;
//       await this.prisma.event.update({
//         where: { id: eventId },
//         data: { attendees: { connect: { id: userId } } },
//       });
//       return this.prisma.event.findUnique({ where: { id: eventId } });
//     } catch (error) {
//       console.log('error:', error);
//       throw error;
//     }
//   }
}