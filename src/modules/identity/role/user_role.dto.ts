import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class AddRoleInput {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  userId: string
  @ApiProperty({ required: true })
  @IsNotEmpty()
  roleId: string
  @ApiProperty({ required: false })
  expiredAt: Date | null
}

export class RemoveRolesInput{
  @ApiProperty({ required: true })
  @IsNotEmpty()
  userId: string
  @ApiProperty({ required: true })
  @IsNotEmpty()
  roleIds: string[]
}