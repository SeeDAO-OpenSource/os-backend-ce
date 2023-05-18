

export class PermissionDefinition {
  name: string
  displayName: string
  children: PermissionDefinition[] = []
  parent?: PermissionDefinition

  addChild(name: string, displayName: string): PermissionDefinition {
    const p = new PermissionDefinition()
    p.name = name
    p.displayName = displayName
    this.children.push(p)
    p.parent = this
    return p
  }
}

export class PermissionGroupDefinition {
  group: string
  displayName: string
  permissions: PermissionDefinition[] = []

  getPermission(name: string): PermissionDefinition | null {
    const p = this.permissions.find(p => p.name == name)
    return p ?? null
  }

  addPermission(name: string, displayName: string) {
    const p = new PermissionDefinition()
    p.name = name
    p.displayName = displayName
    this.permissions.push(p)
  }
}

export class PermissionDefinitionContext {
  groups: { [key: string]: PermissionGroupDefinition } = {}

  addGroup(name: string, displayName: string): PermissionGroupDefinition {
    let group = this.groups[name]
    if (group) {
      throw new Error("There is already an existing permission group with name: " + name)
    }
    group = new PermissionGroupDefinition()
    group.displayName = displayName
    group.group = name
    this.groups[name] = group
    return group
  }

  getGroup(name: string): PermissionGroupDefinition | null {
    return this.groups[name] ?? null
  }
}