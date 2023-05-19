import { IsString, IsBoolean, IsOptional, IsObject, IsNotEmpty, IsNumber, IsDateString, isNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';



export interface SubDIDMintRecordCreateInput {
  address: string;
  subDID: string;
  verifier?: string;
  // 不需要提供timestamp，因为在Prisma模型中我们已经设置了默认值为当前时间
}

export class SubDIDMintRecordCreateDto {
  @IsString()
  readonly address: string;

  @IsString()
  readonly subDID: string;

  @IsOptional()
  @IsString()
  readonly verifier?: string;
}

export class SubDIDMintRecordDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  subDID: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty({ required: false })
  verifier?: string;
}

export class MintSignMsgInput {
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  subDID: string;
}