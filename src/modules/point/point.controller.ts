import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PointService } from './point.service';
import {
  CreatePointRecordDto,
  FindPointRecordByCreatorDto,
  FindPointRecordByIdDto,
  FindAllPointRecordsDto,
  QueryPointRecordsDto,
} from './point.dto';
import { PageAndSort, PagedResult, checkPage, queryPage as QueryPage, ApiPagedResultResponse } from "src/common";

@ApiTags('point')
@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create point records' })
  @ApiBody({ type: CreatePointRecordDto, isArray: true })
  @ApiResponse({ status: 201, description: 'The point records have been successfully created.' })
  async createPointRecords(@Body() records: CreatePointRecordDto[]): Promise<any> {
    return await this.pointService.createPointRecords(records);
  }

  @Post('find/creator')
  @ApiOperation({ summary: 'Find point records by creator' })
  @ApiBody({ type: FindPointRecordByCreatorDto })
  @ApiResponse({ status: 200, description: 'The point records by creator have been successfully returned.' })
  async findPointRecordsByCreator(@Body() body: FindPointRecordByCreatorDto): Promise<any> {
    return await this.pointService.findPointRecordsByCreator(body.id);
  }

  @Post('find/id')
  @ApiOperation({ summary: 'Find point record by ID' })
  @ApiBody({ type: FindPointRecordByIdDto })
  @ApiResponse({ status: 200, description: 'The point record by ID has been successfully returned.' })
  async findPointRecordById(@Body() body: FindPointRecordByIdDto): Promise<any> {
    return await this.pointService.findPointRecordById(body.id);
  }

  @Post('find/all')
  @ApiOperation({ summary: 'Find all point records' })
  @ApiBody({ type: FindAllPointRecordsDto })
  @ApiResponse({ status: 200, description: 'All point records have been successfully returned.' })
  async findAllPointRecords(
    @Body() body: FindAllPointRecordsDto,
  ): Promise<any> {
    return await this.pointService.findAllPointRecords(body.offset, body.limit);
  }

  @Post('query')
  @ApiOperation({ summary: 'Query point records' })
  @ApiBody({ type: QueryPointRecordsDto })
  @ApiResponse({ status: 200, description: 'Queried point records have been successfully returned.' })
  async queryPointRecords(
    @Body() body: QueryPointRecordsDto,
  ): Promise<any> {
    return await this.pointService.queryPointRecords(body.query, body.offset, body.limit);
  }
}


