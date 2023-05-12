// src/budgets/budgets.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { Budget , Point } from '@prisma/client';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  async findAll(): Promise<Budget[]> {
    return this.budgetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Budget> {
    return this.budgetsService.findOne(id);
  }

  @Post()
  async create(@Body() budget: Omit<Budget, 'id'>): Promise<Budget> {
    return this.budgetsService.create(budget);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedBudget: Omit<Budget, 'id'>): Promise<Budget> {
    return this.budgetsService.update(id, updatedBudget);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.budgetsService.delete(id);
  }

  @Post('queryBudgetSubject')
  @HttpCode(HttpStatus.CREATED)
  async queryBudgetSubject(@Body('season') season: string): Promise<any> {
    try {
      const result = await this.budgetsService.queryBudgetSubject(season);
      return { statusCode: HttpStatus.CREATED, status: 'success', data: result };
    } catch (error) {
      throw error;
    }
  }

  @Post('queryBudgetIdBySubjectInclude')
  async queryBudgetIdBySubjectInclude(
    @Body('keyword') keyword: string,
  ): Promise<number[]> {
    return this.budgetsService.queryBudgetIdBySubjectInclude(keyword);
  }

  @Post('queryPointRecordsByBudgetId')
  async queryPointRecordsByBudgetId(
    @Body('ids') ids: string[],
  ): Promise<Point[]> {
    return this.budgetsService.queryPointRecordsByBudgetId(ids);
  }
}

