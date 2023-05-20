
/**
 * RoleDto
 */
export class RoleDto {
  id: string
  name: string
  group?: string | null
}

/**
 * RoleCreateInput
 */
export class RoleCreateInput {
  name: string
  group: string | null
  description: string | null
}

/**
 * RoleUpdateInput
 */
export class RoleUpdateInput {
  name?: string
  group?: string | null
  disabled?: boolean
  description?: string | null
}