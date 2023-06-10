import { Injectable } from '@nestjs/common';
import { Attender } from 'src/prisma';
import { PrismaService } from 'src/prisma/service';
import { Page, PagedResult } from 'src/common';
import { IdGenerator } from 'src/common/id.generator';

@Injectable()
export class AttenderService {
  protected prisma: PrismaService;
  protected idGenerator: IdGenerator;

  constructor(prisma: PrismaService, idGenerator: IdGenerator) {
    this.prisma = prisma;
    this.idGenerator = idGenerator;
  }

  async getList(page: Page): Promise<PagedResult<Attender>> {
    const result = await this.prisma.getPaged(this.prisma.attender, page);
    return result;
  }

  async get(id: string): Promise<Attender | null> {
    const attender = await this.prisma.attender.findUnique({
      where: { id: id },
    });
    return attender;
  }

  async create(attender: Omit<Attender, "id">): Promise<Attender> {
    const data: Attender = {
      ...attender,
      id: this.idGenerator.create(),
    }
    const newAttender = await this.prisma.attender.create({ data })
    return newAttender
  }
  async update(id: string, attender: Attender): Promise<Attender | null> {
    const updatedAttender = await this.prisma.attender.update({
      where: { id: id },
      data: attender,
    });
    return updatedAttender;
  }

  async delete(id: string): Promise<Attender | null> {
    const deletedAttender = await this.prisma.attender.delete({
      where: { id: id },
    });
    return deletedAttender;
  }
}