import { Injectable } from '@nestjs/common';
import { Task } from 'src/prisma';
import { PrismaService } from 'src/prisma/service';
import { Page, PagedResult } from 'src/common';
import { IdGenerator } from 'src/common/id.generator';

@Injectable()
export class TaskService {
  protected prisma: PrismaService;
  protected idGenerator: IdGenerator;

  constructor(prisma: PrismaService, idGenerator: IdGenerator) {
    this.prisma = prisma;
    this.idGenerator = idGenerator;
  }

  async getList(page: Page): Promise<PagedResult<Task>> {
    const result = await this.prisma.getPaged(this.prisma.task, page);
    return result;
  }

  async get(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id: id },
    });
    return task;
  }

  async create(task: Omit<Task, "id">): Promise<Task> {
    const data: Task = {
      ...task,
      id: this.idGenerator.create(),
    }
    const newTask = await this.prisma.task.create({ data })
    return newTask
  }
  async update(id: string, task: Task): Promise<Task | null> {
    const updatedTask = await this.prisma.task.update({
      where: { id: id },
      data: task,
    });
    return updatedTask;
  }

  async delete(id: string): Promise<Task | null> {
    const deletedTask = await this.prisma.task.delete({
      where: { id: id },
    });
    return deletedTask;
  }
}