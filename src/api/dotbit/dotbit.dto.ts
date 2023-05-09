import { IsString, IsBoolean, IsOptional, IsObject } from 'class-validator';
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


export class SubDIDCdkeyDto {
    readonly key: string;
    readonly isValid: boolean;
    readonly address?: string;
    readonly subDID?: string;
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