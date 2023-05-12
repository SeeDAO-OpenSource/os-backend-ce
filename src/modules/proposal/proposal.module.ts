import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { PrismaService } from '../../prisma/service'; // 假设你已经创建了一个 PrismaService，用于连接 Prisma 数据库

@Module({
  providers: [ProposalService, PrismaService],
  controllers: [ProposalController],
})
export class ProposalModule {}