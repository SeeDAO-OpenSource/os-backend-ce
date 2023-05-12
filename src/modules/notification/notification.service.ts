import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service'; 
import { Notification, Prisma } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return this.prisma.notification.create({ data });
  }

  async findAll(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }

  async findOne(id: number): Promise<Notification> {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.NotificationUpdateInput): Promise<Notification> {
    return this.prisma.notification.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Notification> {
    return this.prisma.notification.delete({ where: { id } });
  }
}