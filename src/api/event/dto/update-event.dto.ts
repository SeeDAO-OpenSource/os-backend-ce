// event/dto/update-event.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsDate()
  readonly startDate?: Date;

  @IsOptional()
  @IsDate()
  readonly endDate?: Date;

  @IsOptional()
  @IsNumber()
  readonly maxParticipants?: number;

  @IsOptional()
  @IsString()
  readonly location?: string;
}