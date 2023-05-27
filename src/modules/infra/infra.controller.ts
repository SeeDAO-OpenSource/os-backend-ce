import { Body, Controller, Delete, UseGuards, Get, Injectable, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ToolService } from "./infra.service";
import { PageAndSort, PagedResult, checkPage, QueryPage as QueryPage, ApiPagedResultResponse } from "src/common";
import { InfraTool } from "src/prisma";
import { ToolCreateInput, ToolDto, ToolUpdateInput } from "./infra.dto";
import { IdGenerator } from "src/common/id.generator";
import { Auth } from "src/auth";
import { Permissions } from "src/permission"

@Injectable()
@Controller('infra-tools')
@ApiTags('InfraTools')
export class ToolController {

  constructor(
    protected readonly service: ToolService,
    protected readonly idGenerator: IdGenerator
  ) { }


  /**
   * Get a list of tools
   * @returns 
   */
  @Get()
  @ApiPagedResultResponse(ToolDto)
  getList(@QueryPage() page: PageAndSort): Promise<PagedResult<ToolDto>> {
    checkPage(page)
    return this.service.getList(page)
  }

  @Post()
  @ApiResponse({ type: ToolDto })
  @Permissions("Create")
  create(@Body() input: ToolCreateInput): Promise<ToolDto> {
    return this.service.create({
      ...input,
      createdAt: new Date(),
      createdBy: null,
    })
  }

  @Delete(":id")
  @ApiResponse({ type: ToolDto })
  @Auth()
  delete(@Param("id") id: string): Promise<ToolDto> {
    return this.service.delete(id)
  }

  @Put(":id")
  @ApiResponse({ type: ToolDto })
  @Auth()
  async update(@Param("id") id: string, @Body() input: ToolUpdateInput): Promise<ToolDto> {
    return this.service.update(id, input)
  }

  protected mapUpdateTool(input: ToolUpdateInput, to: InfraTool) {
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