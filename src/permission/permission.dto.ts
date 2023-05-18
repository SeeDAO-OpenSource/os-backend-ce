import { ApiProperty } from "@nestjs/swagger"
import { PermissionGroupDefinition } from "./definition.context"
import { IsNotEmpty, Length, arrayMinSize, minLength } from "class-validator"

export class PermissionDefinitionDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  displayName: string
  @ApiProperty()
  children: PermissionDefinitionDto[] = []
}

export class UserPermissions {
  [key:string]: boolean
}

export class PermissionDefinitionGroupDto {
  @ApiProperty()
  group: string
  @ApiProperty()
  displayName: string
  @ApiProperty()
  permissions: PermissionDefinitionDto[] = []
}

export class GrantPermissionsInput {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  permissions: string[]
  @ApiProperty({ required: true })
  @IsNotEmpty()
  providerName: string
  @ApiProperty({ required: true })
  @IsNotEmpty()
  providerKey: string
  @ApiProperty({ required: true })
  isGranted: boolean
  @ApiProperty({ required: false })
  expiredAt?: Date
}

export function mapDefinitionDto(definitions: PermissionDefinitionDto[]): PermissionDefinitionDto[] {
  const result: PermissionDefinitionDto[] = []
  for (const d of definitions) {
    const item = {
      name: d.name,
      displayName: d.displayName,
      children: []
    }
    item.children = mapDefinitionDto(d.children)
    result.push(item)
  }
  return result
}

export function mapDefinitionGroupDto(groups: PermissionGroupDefinition[]): PermissionDefinitionGroupDto[] {
  const result: PermissionDefinitionGroupDto[] = []
  for (const d of groups) {
    result.push({
      group: d.group,
      displayName: d.displayName,
      permissions: mapDefinitionDto(d.permissions)
    })
  }
  return result
}