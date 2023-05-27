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
import { TaskService } from './task.service';
import {
  PageAndSort,
  PagedResult,
  checkPage,
  QueryPage as QueryPage,
  ApiPagedResultResponse,
} from 'src/common';
import { Task } from 'src/prisma';
import {
  TaskCreateInput,
  TaskDto,
  TaskUpdateInput,
} from './task.dto';
import { IdGenerator } from 'src/common/id.generator';
import { Auth } from 'src/auth';
import { Permissions } from 'src/permission';

@Injectable()
@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(
    protected readonly service: TaskService,
    protected readonly idGenerator: IdGenerator,
  ) {}

  /**
   * Get a list of tasks
   * @returns
   */
  @Get()
  @ApiPagedResultResponse(TaskDto)
  getList(@QueryPage() page: PageAndSort): Promise<PagedResult<TaskDto>> {
    checkPage(page);
    return this.service.getList(page);
  }

  @Post()
  @ApiResponse({ type: TaskDto })
  @Permissions('Create')
  create(@Body() input: TaskCreateInput): Promise<TaskDto> {
    const task = this.mapCreateTask(input);
    return this.service.create(task);
  }

  @Delete(':id')
  @ApiResponse({ type: TaskDto })
  @Auth()
  delete(@Param('id') id: string): Promise<TaskDto> {
    return this.service.delete(id);
  }

  @Put(':id')
  @ApiResponse({ type: TaskDto })
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() input: TaskUpdateInput,
  ): Promise<TaskDto> {
    const task = await this.service.get(id);
    this.mapUpdateTask(input, task);
    return this.service.update(id, task);
  }

  protected mapCreateTask(input: TaskCreateInput): Task {
    const task: Task = {
      ...input,
      id: this.idGenerator.create(),
    };
    return task;
  }

  protected mapUpdateTask(input: TaskUpdateInput, to: Task) {
    if (input.name !== undefined) {
      to.name = input.name;
    }
    if (input.description !== undefined) {
      to.description = input.description;
    }
    // Add mapping for other fields as needed
  }
}