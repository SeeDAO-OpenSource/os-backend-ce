import { Injectable } from '@nestjs/common';
import { Project } from 'src/prisma';
import { PrismaService } from 'src/prisma/service';
import { Page, PagedResult } from 'src/common';
import { IdGenerator } from 'src/common/id.generator';

@Injectable()
export class ProjectService {
  protected prisma: PrismaService;
  protected idGenerator: IdGenerator;

  constructor(prisma: PrismaService, idGenerator: IdGenerator) {
    this.prisma = prisma;
    this.idGenerator = idGenerator;
  }

  async getList(page: Page): Promise<PagedResult<Project>> {
    const result = await this.prisma.getPaged(this.prisma.project, page);
    return result;
  }

  async get(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id: id },
    });
    return project;
  }

  async create(project: Omit<Project, "id">): Promise<Project> {
    const data: Project = {
      ...project,
      id: this.idGenerator.create(),
    }
    const newProject = await this.prisma.project.create({ data })
    return newProject
  }
  async update(id: string, project: Project): Promise<Project | null> {
    const updatedProject = await this.prisma.project.update({
      where: { id: id },
      data: project,
    });
    return updatedProject;
  }

  async delete(id: string): Promise<Project | null> {
    const deletedProject = await this.prisma.project.delete({
      where: { id: id },
    });
    return deletedProject;
  }
}