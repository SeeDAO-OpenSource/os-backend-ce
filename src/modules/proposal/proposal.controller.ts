import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Query,
  } from '@nestjs/common';
  import { ProposalService } from './proposal.service';
  import { CreateProposalDto } from './dto/create-proposal.dto';
  import { QueryProposalDto } from './dto/query-proposal.dto';
  
  @Controller('proposals')
  export class ProposalController {
    constructor(private readonly proposalService: ProposalService) {}
  
    // @Post()
    // create(@Body() createProposalDto: CreateProposalDto) {
    //   return this.proposalService.createProposal(createProposalDto);
    // }
  
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.proposalService.findById(id);
    }
  
    @Get()
    findAll(@Query() queryProposalDto: QueryProposalDto) {
      const { category, offset = 0, limit = 10 } = queryProposalDto;
      return category
        ? this.proposalService.findByCategory(category, offset, limit)
        : this.proposalService.findAll(offset, limit);
    }
  
    @Get('/title/:title')
    findIdByTitle(@Param('title') title: string) {
      return this.proposalService.findIdByTitle(title);
    }
  }