import { Injectable } from '@nestjs/common';
import { PrismaClient, Activity } from '@prisma/client';

@Injectable()
export class ActivitiesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Activity[]> {
    return this.prisma.activity.findMany();
  }

  async findOne(id: string): Promise<Activity> {
    return this.prisma.activity.findUnique({ where: { id } });
  }

  async create(activity: Omit<Activity, 'id'>): Promise<Activity> {
    return this.prisma.activity.create({ data: activity });
  }

  async getUpcomingActivity(): Promise<Activity[]> {
    const now = new Date();
    const currentTime = now.getTime() - 60 * 60 * 1000;
    return this.prisma.activity.findMany({
      where: {
        start: {
          gt: currentTime,
        },
      },
    });
  }

  // async checkinActivity(
  //   activityId: string,
  //   checkinCode: string,
  //   wallet: string,
  // ): Promise<{ isChecked: boolean; result: Record<string, any> }> {
  //   const activity = await this.findOne(activityId);
  //   const found = activity.participants.find((p) => p.wallet === wallet);
  //   if (found !== undefined && found !== null) {
  //     return {
  //       isChecked: false,
  //       result: { error: 'already-checkin' },
  //     };
  //   }
  //   if (String(activity.checkinCode) === String(checkinCode)) {
  //     const result = await this.prisma.activity.update({
  //       where: { id: activityId },
  //       data: {
  //         participants: {
  //           create: { wallet: wallet, updated: Date.now() },
  //         },
  //       },
  //     });
  //     return { isChecked: true, result: { error: '', ...result } };
  //   } else {
  //     return {
  //       isChecked: false,
  //       result: { error: 'checkin-code-incorrect' },
  //     };
  //   }
  // }

  async update(id: string, updatedActivity: Omit<Activity, 'id'>): Promise<Activity> {
  return this.prisma.activity.update({ where: { id }, data: updatedActivity });
  }
  
  async delete(id: string): Promise<void> {
  await this.prisma.activity.delete({ where: { id } });
  }
  }