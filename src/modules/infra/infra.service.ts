import { Injectable } from '@nestjs/common'
import { InfraTool } from '@prisma/client'
import { PrismaService } from 'src/prisma/service'
import { Page, PagedResult } from 'src/common'
import { IdGenerator } from 'src/common/id'

@Injectable()
export class ToolService {

  protected prisma: PrismaService
  protected idGenerator: IdGenerator

  constructor(prisma: PrismaService, idGenerator: IdGenerator) {
    this.prisma = prisma
    this.idGenerator = idGenerator
  }

  async getList(page: Page): Promise<PagedResult<InfraTool>> {
    const result = await this.prisma.getPaged(this.prisma.infraTool, page)
    return result
  }

  async get(id: string): Promise<InfraTool | null> {
    const tool = await this.prisma.infraTool.findUnique({
      where: { id: id },
    })
    return tool
  }

  async create(tool: InfraTool): Promise<InfraTool> {
    const newTool = await this.prisma.infraTool.create({
      data: tool,
    })
    return newTool
  }

  async update(id: string, tool: InfraTool): Promise<InfraTool | null> {
    const updatedTool = await this.prisma.infraTool.update({
      where: { id: id },
      data: tool,
    })
    return updatedTool
  }

  async delete(id: string): Promise<InfraTool | null> {
    const deletedTool = await this.prisma.infraTool.delete({
      where: { id: id },
    })
    return deletedTool
  }
}