import { PermissionDefinitionContext, PermissionDefinitionProvider } from "src/permission";

export class UserPermissionDefinitionProvider implements PermissionDefinitionProvider {

  define(ctx: PermissionDefinitionContext): void {
    const group = ctx.addGroup("user", "user management")
    group.addPermission("user.create", "Create")
    group.addPermission("user.update", "Update")
    group.addPermission("user.Delete", "Delete")
  }
}