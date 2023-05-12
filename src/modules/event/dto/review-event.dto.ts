// event/dto/review-event.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ReviewEventDto {
  @IsNotEmpty()
  @IsNumber()
  readonly eventId: number;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;

  @IsOptional()
  @IsString()
  readonly comment?: string;
}