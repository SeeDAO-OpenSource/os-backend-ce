import { ApiProperty } from "@nestjs/swagger"

export class RoleDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
}

export class RoleCreateInput {
  @ApiProperty({ required: true })
  name: string
}

export class RoleUpdateInput{
  @ApiProperty({ required: false })
  name?: string
}