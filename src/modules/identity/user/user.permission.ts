import { PermissionDefinitionContext, IPermissionDefinitionProvider } from "src/permission";

export class UserPermissionDefinitionProvider implements IPermissionDefinitionProvider {

  define(ctx: PermissionDefinitionContext): void {
    const group = ctx.addGroup("user", "user management")
    group.addPermission("user.create", "Create")
    group.addPermission("user.update", "Update")
    group.addPermission("user.Delete", "Delete")
  }
}