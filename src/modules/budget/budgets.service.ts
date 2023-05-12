// src/budgets/budgets.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient, Budget, Point } from '@prisma/client';

@Injectable()
export class BudgetsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Budget[]> {
    return this.prisma.budget.findMany({ include: { pointRecords: true } });
  }

  async findOne(id: string): Promise<Budget> {
    return this.prisma.budget.findUnique({ where: { id }, include: { pointRecords: true } });
  }

  async create(budget: Omit<Budget, 'id'>): Promise<Budget> {
    return this.prisma.budget.create({ data: budget });
  }

  async update(id: string, updatedBudget: Omit<Budget, 'id'>): Promise<Budget> {
    return this.prisma.budget.update({ where: { id }, data: updatedBudget });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.budget.delete({ where: { id } });
  }

  async queryBudgetSubject(season: string): Promise<Partial<Budget>[]> {
    return this.prisma.budget.findMany({
      where: { season },
      select: { subject: true },
    });
  }
  
  async queryBudgetIdBySubjectInclude(keyword: string): Promise<number[]> {
    const budgets = await this.prisma.budget.findMany({
      where: {
        subject: {
          contains: keyword,
        //   mode: 'insensitive', // case-insensitive search
        },
      },
      select: { id: true },
    });
    return budgets.map((budget) => parseInt(budget.id));
  }

  async queryPointRecordsByBudgetId(ids: string[]): Promise<Point[]> {
    const points = await this.prisma.point.findMany({
      where: {
        budgetId: {
          in: ids,
        },
      },
    });
  
    return points;
  }
}
