import { Injectable } from '@nestjs/common';
import { Budget } from 'src/prisma';
import { PrismaService } from 'src/prisma/service';
import { Page, PagedResult } from 'src/common';
import { IdGenerator } from 'src/common/id.generator';

@Injectable()
export class BudgetService {
  protected prisma: PrismaService;
  protected idGenerator: IdGenerator;

  constructor(prisma: PrismaService, idGenerator: IdGenerator) {
    this.prisma = prisma;
    this.idGenerator = idGenerator;
  }

  async getList(page: Page): Promise<PagedResult<Budget>> {
    const result = await this.prisma.getPaged(this.prisma.budget, page);
    return result;
  }

  async get(id: string): Promise<Budget | null> {
    const budget = await this.prisma.budget.findUnique({
      where: { id: id },
    });
    return budget;
  }

  async create(budget: Budget): Promise<Budget> {
    const newBudget = await this.prisma.budget.create({
      data: budget,
    });
    return newBudget;
  }

  async update(id: string, budget: Budget): Promise<Budget | null> {
    const updatedBudget = await this.prisma.budget.update({
      where: { id: id },
      data: budget,
    });
    return updatedBudget;
  }

  async delete(id: string): Promise<Budget | null> {
    const deletedBudget = await this.prisma.budget.delete({
      where: { id: id },
    });
    return deletedBudget;
  }
}