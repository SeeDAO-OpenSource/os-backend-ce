import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ToolDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  type: string
  @ApiProperty()
  logo?: string
  @ApiProperty()
  description?: string
  @ApiProperty()
  url?: string
  @ApiProperty()
  createdAt: Date
  @ApiProperty()
  createdBy?: string
}

export class ToolCreateInput {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string

  @IsNotEmpty()
  @ApiProperty({ required: true })
  type: string

  @ApiProperty({ required: false })
  logo: string | null = null

  @ApiProperty({ required: false })
  description: string | null = null
  
  @ApiProperty({ required: false })
  url: string | null = null
}

export class ToolUpdateInput {
  @ApiProperty({ required: false, description: "name" })
  name?: string
  @ApiProperty({ required: false })
  type?: string
  @ApiProperty({ required: false })
  logo?: string | null 
  @ApiProperty({ required: false })
  description?: string | null
  @ApiProperty({ required: false })
  url?: string | null
}

