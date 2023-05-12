import { IsString, IsBoolean, IsOptional, IsObject , IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerifyMintParam {
  @ApiProperty()
  @IsString()
  address: string;

  [key: string]: any;
}

export class VerifyMintResult {
  @ApiProperty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @IsString()
  verifierName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  data?: { [key: string]: any };
}



export type MitSubDIDParam = {
  // 钱包地址
  address: string;
  // subDID 的名称 ，比如：'test'，不包含 seedao.bit
  subDID: string;
};

export type MintSubDIDInput = MitSubDIDParam & {
  // 包含了 subDID 的签名
  signature: string;
  [key: string]: any;
};

export class MintSubDIDResult {
  success: boolean;
  message?: string;
  hash?: string;
}

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

export class MintSignMsgDto {
  @IsString()
  readonly address: string;

  @IsString()
  readonly subDID: string;

}
// CDKEY DTO

export class SubDIDCdKeyDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  isValid: boolean;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  subDID?: string;
}




// SGN DTO
export class SGNMintRecordModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  tokenId: number;

  @ApiProperty()
  subDID: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  contract: string;
}

export class InsertSGNMintRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tokenId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subDID: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsDateString()
  // timestamp: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contract: string;
}

export class QuerySgnMintRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tokenId: number;
}
