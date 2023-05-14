import { ApiProperty } from "@nestjs/swagger"
import { PermissionGroupDefinition } from "./definition.context"

export class PermissionDefinitionDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  displayName: string
  @ApiProperty()
  children: PermissionDefinitionDto[] = []
}

export class PermissionDefinitionGroupDto {
  @ApiProperty()
  group: string
  @ApiProperty()
  displayName: string
  @ApiProperty()
  permissions: PermissionDefinitionDto[] = []
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