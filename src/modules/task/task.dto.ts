import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsArray } from "class-validator";

export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  assigned_to: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  subtasks: string[];

  @ApiProperty()
  @IsString()
  creator: string;

  @ApiProperty()
  @IsString()
  reviewer: string;

  @ApiProperty()
  @IsString()
  evaluation: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  links: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  rewards: string[];
}

export class TaskCreateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  assigned_to: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  subtasks: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  creator: string;

  @ApiProperty()
  @IsString()
  reviewer: string;

  @ApiProperty()
  @IsString()
  evaluation: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  links: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  rewards: string[];
}

export class TaskUpdateInput {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assigned_to?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subtasks?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  creator?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reviewer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  evaluation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  links?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rewards?: string[];
}