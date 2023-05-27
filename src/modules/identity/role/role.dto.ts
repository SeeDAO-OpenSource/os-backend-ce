import { Role } from "src/prisma"

/**
 * RoleDto
 */
export class RoleDto {
  id: string
  name: string
  description: string | null
  group?: string | null
  disabled: boolean

  constructor(r: Role) {
    this.id = r.id
    this.name = r.name
    this.group = r.group
    this.description = r.description
    this.disabled = r.disabled
  }
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
