// event/dto/attend-event.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AttendEventDto {
  @IsNotEmpty()
  @IsNumber()
  readonly eventId: number;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly attendCode: string;
}