import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class AddUserRolesInput {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  userId: string
  @ApiProperty({ required: true })
  @IsNotEmpty()
  roleIds: string[]
  @ApiProperty({ required: false })
  expiredAt: Date | null
}

export class RemoveUserRolesInput {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  userId: string
  @ApiProperty({ required: true })
  @IsNotEmpty()
  roleIds: string[]
}

export class UpdateUserRoleInput {
  @IsNotEmpty()
  userId: string
  @IsNotEmpty()
  roleId: string
  expiredAt: Date | null
}