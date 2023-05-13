import { IsNotEmpty } from "class-validator"

export class ToolDto {
  id: string
  name: string
  type: string
  logo?: string
  description?: string
  url?: string
  createdAt: Date
  createdBy?: string
}

export class ToolCreateInput {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  type: string
  logo: string | null = null
  description: string | null = null
  url: string | null = null
}

export class ToolUpdateInput{
  name?: string | null = null
  type?: string| null = null
  logo?: string | null = null
  description?: string | null = null
  url?: string | null = null
}