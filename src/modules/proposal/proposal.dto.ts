import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';
export class ProposalDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  members: string[];

  @ApiProperty({ type: String })
  @IsString()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  body: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  params: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  polls: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  links: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  onchain_history: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  onchain_call?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  budget: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  empowerments: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  project?: string;

  @ApiProperty({ type: Date })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  author?: string;
}

export class ProposalCreateInput {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  members: string[];

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  status: string | null = null

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  category: string | null = null

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  params: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  polls: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  links: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  onchain_history: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  onchain_call: string | null = null

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  budget: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  empowerments: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  project: string | null = null

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  author: string | null = null
  
}

export class ProposalUpdateInput {
  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  members?: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  params?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  polls?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  links?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  onchain_history?: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  onchain_call?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  budget?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  empowerments?: string[];

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  project?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  author?: string;
}

