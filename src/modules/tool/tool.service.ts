import { Injectable } from '@nestjs/common'
import { Tool } from '@prisma/client'
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

  async getList(page: Page): Promise<PagedResult<Tool>> {
    const result = await this.prisma.getPaged(this.prisma.tool, page)
    return result
  }

  async get(id: string): Promise<Tool | null> {
    const tool = await this.prisma.tool.findUnique({
      where: { id: id },
    })
    return tool
  }

  async create(tool: Tool): Promise<Tool> {
    const newTool = await this.prisma.tool.create({
      data: tool,
    })
    return newTool
  }

  async update(id: string, tool: Tool): Promise<Tool | null> {
    const updatedTool = await this.prisma.tool.update({
      where: { id: id },
      data: tool,
    })
    return updatedTool
  }

  async delete(id: string): Promise<Tool | null> {
    const deletedTool = await this.prisma.tool.delete({
      where: { id: id },
    })
    return deletedTool
  }
}