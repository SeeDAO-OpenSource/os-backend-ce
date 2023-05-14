import { PermissionDefinitionContext, PermissionDefinitionProvider } from "src/permission";

export class RolePermissionDefinitionProvider implements PermissionDefinitionProvider {

  define(ctx: PermissionDefinitionContext): void {
    const group = ctx.addGroup("role", "role management")
    group.addPermission("role.create", "Create")
    group.addPermission("role.update", "Update")
    group.addPermission("role.Delete", "Delete")
  }
}