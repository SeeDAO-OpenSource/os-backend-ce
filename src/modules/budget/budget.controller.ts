import {
  Body,
  Controller,
  Delete,
  UseGuards,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import {
  PageAndSort,
  PagedResult,
  checkPage,
  QueryPage as QueryPage,
  ApiPagedResultResponse,
} from 'src/common';
import { Budget } from 'src/prisma';
import {
  BudgetCreateInput,
  BudgetDto,
  BudgetUpdateInput,
} from './budget.dto';
import { IdGenerator } from 'src/common/id.generator';
import { Auth } from 'src/auth';
import { Permissions } from 'src/permission';

@Injectable()
@Controller('budgets')
@ApiTags('Budgets')
export class BudgetController {
  constructor(
    protected readonly service: BudgetService,
    protected readonly idGenerator: IdGenerator,
  ) {}

  /**
   * Get a list of budgets
   * @returns
   */
  @Get()
  @ApiPagedResultResponse(BudgetDto)
  getList(@QueryPage() page: PageAndSort): Promise<PagedResult<BudgetDto>> {
    checkPage(page);
    return this.service.getList(page);
  }

  @Post()
  @ApiResponse({ type: BudgetDto })
  @Permissions('Create')
  create(@Body() input: BudgetCreateInput): Promise<BudgetDto> {
    const budget = this.mapCreateBudget(input);
    return this.service.create(budget);
  }

  @Delete(':id')
  @ApiResponse({ type: BudgetDto })
  @Auth()
  delete(@Param('id') id: string): Promise<BudgetDto> {
    return this.service.delete(id);
  }

  @Put(':id')
  @ApiResponse({ type: BudgetDto })
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() input: BudgetUpdateInput,
  ): Promise<BudgetDto> {
    const budget = await this.service.get(id);
    this.mapUpdateBudget(input, budget);
    return this.service.update(id, budget);
  }

  protected mapCreateBudget(input: BudgetCreateInput): Budget {
    const budget: Budget = {
      ...input,
      id: this.idGenerator.create(),
      createdAt: new Date(),
    };
    return budget;
  }

  protected mapUpdateBudget(input: BudgetUpdateInput, to: Budget) {
    if (input.name !== undefined) {
      to.name = input.name;
    }
    if (input.statement !== undefined) {
      to.statement = input.statement;
    }
  }
}