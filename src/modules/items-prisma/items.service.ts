import { Injectable } from '@nestjs/common';
import { PrismaClient , Item } from '@prisma/client';

@Injectable()

export class ItemsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany();
  }

  async findOne(id: number): Promise<Item> {
    return this.prisma.item.findUnique({ where: { id } });
  }

  async create(item: Omit<Item, 'id'>): Promise<Item> {
    return this.prisma.item.create({ data: item });
  }

  async update(id: number, updatedItem: Omit<Item, 'id'>): Promise<Item> {
    return this.prisma.item.update({ where: { id }, data: updatedItem });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.item.delete({ where: { id } });
  }
}
