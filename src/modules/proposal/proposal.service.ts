import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service'; 
import { CreateProposalDto } from './dto/create-proposal.dto';
import { QueryProposalDto } from './dto/query-proposal.dto';

@Injectable()
export class ProposalService {
  constructor(private readonly prisma: PrismaService) {}

//   async createProposal(data: CreateProposalDto) {
//     return this.prisma.proposal.create({ data });
//   }

  async findById(id: string) {
    return this.prisma.proposal.findUnique({ where: { id } });
  }

  async findAll(offset: number, limit: number) {
    return this.prisma.proposal.findMany({
      skip: offset,
      take: limit,
      orderBy: { datetime: 'desc' },
    });
  }

  async findByCategory(category: string, offset: number, limit: number) {
    return this.prisma.proposal.findMany({
      where: { category },
      skip: offset,
      take: limit,
      orderBy: { datetime: 'desc' },
    });
  }

  async findIdByTitle(title: string) {
    const proposal = await this.prisma.proposal.findFirst({ where: { title } });
    return proposal ? proposal.id : null;
  }
}