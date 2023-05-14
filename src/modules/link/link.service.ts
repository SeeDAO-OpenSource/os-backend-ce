import { Injectable } from '@nestjs/common';
import { PrismaClient, Link } from '@prisma/client';

@Injectable()
export class LinkService {
    private prisma: PrismaClient;

    constructor() {
      this.prisma = new PrismaClient();
    }
  async createLink(data: Omit<Link, 'id'>): Promise<Link> {
    return this.prisma.link.create({ data });
  }

  async getLinks(): Promise<Link[]> {
    return this.prisma.link.findMany({ include: { roles: true, tags: true } });
  }

  async getLink(id: string): Promise<Link | null> {
    return this.prisma.link.findUnique({ where: { id }, include: { roles: true, tags: true } });
  }

  async updateLink(id: string, data: Partial<Omit<Link, 'id'>>): Promise<Link | null> {
    return this.prisma.link.update({ where: { id }, data, include: { roles: true, tags: true } });
  }

  async deleteLink(id: string): Promise<Link | null> {
    return this.prisma.link.delete({ where: { id }, include: { roles: true, tags: true } });
  }
}
