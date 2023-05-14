import { IsOptional, IsString, IsInt, IsArray, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger"

export class CreatePointRecordDto {
  @ApiProperty({ description: 'The creator of the point record.' })
  creator: string;

  @ApiProperty({ description: 'The optional beneficiary of the point record.' })
  beneficiary?: string;

  @ApiProperty({ description: 'The beneficiary ID of the point record.' })
  beneficiaryId: string;

  @ApiProperty({ description: 'The status of the point record.' })
  status: string;

  @ApiProperty({ description: 'The claim value of the point record.' })
  valueClaim: number;

  @ApiProperty({ description: 'The date and time of the point record.' })
  datetime: Date;

  @ApiProperty({ description: 'The optional budget ID of the point record.' })
  budgetId?: string;

  @ApiProperty({ description: 'The optional wallet of the point record.' })
  wallet?: string;

  @ApiProperty({ description: 'Optional notes for the point record.' })
  notes?: string;

  @ApiProperty({ description: 'Optional event for the point record.' })
  event?: string;

  @ApiProperty({ description: 'Optional fulfilled value for the point record.' })
  valueFulfilled?: number;

  @ApiProperty({ description: 'Optional transactions for the point record.', type: 'array', items: { type: 'string' } })
  transactions?: any;

  @ApiProperty({ description: 'Optional links for the point record.', type: 'array', items: { type: 'string' } })
  links?: any;
}

 
export class FindPointRecordByCreatorDto {
  @ApiProperty({ description: 'The ID of the creator to find point records for.' })
  id: string;
}

export class FindPointRecordByIdDto {
  @ApiProperty({ description: 'The ID of the point record to find.' })
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class FindAllPointRecordsDto {
  @ApiProperty({ description: 'The offset for pagination.', default: 0 })
  offset: number;

  @ApiProperty({ description: 'The limit for pagination.', default: 10 })
  limit: number;
}

export class QueryPointRecordsDto {
  @ApiProperty({ description: 'The query object to filter point records.' })
  query: any;

  @ApiProperty({ description: 'The offset for pagination.', default: 0 })
  offset: number;

  @ApiProperty({ description: 'The limit for pagination.', default: 10 })
  limit: number;
}