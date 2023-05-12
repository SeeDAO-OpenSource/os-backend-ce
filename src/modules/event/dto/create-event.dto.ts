// event/dto/create-event.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDate()
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  readonly endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly maxParticipants: number;

  @IsOptional()
  @IsString()
  readonly location?: string;
}