import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BudgetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  related: string;

  @ApiProperty()
  @IsString()
  proposal: string;

  @ApiProperty()
  @IsString()
  asset: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  cap: string;

  @ApiProperty()
  @IsString()
  statement: string;

  @ApiProperty()
  createdAt: Date;
}

export class BudgetCreateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  related: string;

  @ApiProperty()
  @IsString()
  proposal: string | null = null

  @ApiProperty()
  @IsString()
  asset: string | null = null

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  cap: string | null = null

  @ApiProperty()
  @IsString()
  statement: string | null = null
}

export class BudgetUpdateInput {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  related?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  proposal?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  asset?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cap?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  statement?: string;
}