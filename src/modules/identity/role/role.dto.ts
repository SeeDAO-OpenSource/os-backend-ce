import { ApiProperty } from "@nestjs/swagger"

export class RoleDto {
  /**
   * this is id
   * @example 1
   */
  id: string
  /**
   * this is name
   * @example admin
   */
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