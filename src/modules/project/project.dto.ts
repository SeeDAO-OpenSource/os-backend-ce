import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsArray } from "class-validator";

export class ProjectDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  roles: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  proposals: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  tasks: string[];


  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  bounties: string[];


  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  members: string[];

}

export class ProjectCreateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  roles: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  proposals: string[];


  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  tasks: string[];


  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  bounties: string[];


  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  members: string[];

}

export class ProjectUpdateInput {
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
  @IsArray()
  @IsString({ each: true })
  roles?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  proposals?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tasks?: string[];


  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bounties?: string[];


  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  members?: string[];



}