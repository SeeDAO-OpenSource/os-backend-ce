import { Injectable } from '@nestjs/common'
import { Proposal } from 'src/prisma'
import { PrismaService } from 'src/prisma/service'
import { Page, PagedResult } from 'src/common'
import { IdGenerator } from 'src/common/id.generator'

@Injectable()
export class ProposalService {

  protected prisma: PrismaService
  protected idGenerator: IdGenerator

  constructor(prisma: PrismaService, idGenerator: IdGenerator) {
    this.prisma = prisma
    this.idGenerator = idGenerator
  }

  async getList(page: Page): Promise<PagedResult<Proposal>> {
    const result = await this.prisma.getPaged(this.prisma.proposal, page)
    return result
  }

  async get(id: string): Promise<Proposal | null> {
    const proposal = await this.prisma.proposal.findUnique({
      where: { id: id },
    })
    return proposal
  }

  async create(proposal: Proposal): Promise<Proposal> {
    const newProposal = await this.prisma.proposal.create({
      data: proposal,
    })
    return newProposal
  }

  async update(id: string, proposal: Proposal): Promise<Proposal | null> {
    const updatedProposal = await this.prisma.proposal.update({
      where: { id: id },
      data: proposal,
    })
    return updatedProposal
  }

  async delete(id: string): Promise<Proposal | null> {
    const deletedProposal = await this.prisma.proposal.delete({
      where: { id: id },
    })
    return deletedProposal
  }
}