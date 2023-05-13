import { Body, Controller, Delete, Get, Injectable, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ToolService } from "./tool.service";
import { PageAndSort, PagedResult, checkPage, queryPage as QueryPage } from "src/common";
import { Tool } from "@prisma/client";
import { ToolCreateInput, ToolDto, ToolUpdateInput } from "./tool.dto";
import { IdGenerator } from "src/common/id";

@Injectable()
@Controller('tools')
@ApiTags('Tools')
export class ToolController {

  constructor(
    protected readonly service: ToolService,
    protected readonly idGenerator: IdGenerator
  ) {}

  /**
   * Get a list of tools
   * @returns 
   */
  @Get()
  getList(@QueryPage() page: PageAndSort): Promise<PagedResult<ToolDto>> {
    checkPage(page)
    return this.service.getList(page)
  }

  @Post()
  create(@Body() input: ToolCreateInput): Promise<ToolDto> {
    const tool = this.mapCreateTool(input)
    return this.service.create(tool)
  }

  @Delete(":id")
  delete(@Param("id") id: string): Promise<ToolDto> {
    return this.service.delete(id)
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() input: ToolUpdateInput): Promise<ToolDto> {
    const tool = await this.service.get(id)
    this.mapUpdateTool(input, tool)
    return this.service.update(id, tool)
  }

  protected mapCreateTool(input: ToolCreateInput): Tool {
    const tool: Tool = {
      ...input,
      id: this.idGenerator.create(),
      createdAt: new Date(),
      createdBy: null,
    }
    return tool
  }

  protected mapUpdateTool(input: ToolUpdateInput, to: Tool) {
    if (input.name !== undefined) {
      to.name = input.name
    }
    if (input.type !== undefined) {
      to.type = input.type
    }
    if (input.logo !== undefined) {
      to.logo = input.logo
    }
    if (input.description !== undefined) {
      to.description = input.description
    }
    if (input.url !== undefined) {
      to.url = input.url
    }
  }
}