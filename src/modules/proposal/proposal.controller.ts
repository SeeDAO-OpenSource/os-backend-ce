import { Body, Controller, Delete, UseGuards, Get, Injectable, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProposalService } from "./proposal.service";
import { PageAndSort, PagedResult, checkPage, QueryPage as QueryPage, ApiPagedResultResponse } from "src/common";
import { Proposal } from "src/prisma";
import { ProposalCreateInput, ProposalDto, ProposalUpdateInput } from "./proposal.dto";
import { IdGenerator } from "src/common/id.generator";
import { Auth } from "src/auth";
import { Permissions } from "src/permission"

@Injectable()
@Controller('proposals')
@ApiTags('Proposals')
export class ProposalController {

  constructor(
    protected readonly service: ProposalService,
    protected readonly idGenerator: IdGenerator
  ) { }

  
  /**
   * Get a list of proposals
   * @returns 
   */
  @Get()
  @ApiPagedResultResponse(ProposalDto)
  getList(@QueryPage() page: PageAndSort): Promise<PagedResult<ProposalDto>> {
    checkPage(page)
    return this.service.getList(page)
  }

  @Post()
  @ApiResponse({ type: ProposalDto })
  @Permissions("Create")
  create(@Body() input: ProposalCreateInput): Promise<ProposalDto> {
    const proposal = this.mapCreateProposal(input)
    return this.service.create(proposal)
  }

  @Delete(":id")
  @ApiResponse({ type: ProposalDto })
  @Auth()
  delete(@Param("id") id: string): Promise<ProposalDto> {
    return this.service.delete(id)
  }

  @Put(":id")
  @ApiResponse({ type: ProposalDto })
  @Auth()
  async update(@Param("id") id: string, @Body() input: ProposalUpdateInput): Promise<ProposalDto> {
    const proposal = await this.service.get(id)
    this.mapUpdateProposal(input, proposal)
    return this.service.update(id, proposal)
  }

  protected mapCreateProposal(input: ProposalCreateInput): Proposal {
    const proposal: Proposal = {
      ...input,
      id: this.idGenerator.create(),
      createdAt: new Date(),
    }
    return proposal
  }

  protected mapUpdateProposal(input: ProposalUpdateInput, to: Proposal) {
    if (input.title !== undefined) {
      to.title = input.title
    }
    if (input.body !== undefined) {
      to.body = input.body
    }
  }
}