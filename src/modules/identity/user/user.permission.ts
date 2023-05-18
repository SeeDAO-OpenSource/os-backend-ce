import { PermissionDefinitionContext, IPermissionDefinitionProvider } from "src/permission";

const UserPermissionGroup = "user"
export class UserPermissions {
  static Name = UserPermissionGroup
  static Create = UserPermissionGroup + ".create"
  static Update = UserPermissionGroup + ".update"
  static Delete = UserPermissionGroup + ".delete"
}


export class UserPermissionDefinitionProvider implements IPermissionDefinitionProvider {

  define(ctx: PermissionDefinitionContext): void {
    const group = ctx.addGroup("user", "user management")
    group.addPermission(UserPermissions.Create, "Create user")
    group.addPermission(UserPermissions.Update, "Update user for all users")
    group.addPermission(UserPermissions.Delete, "Delete user")
  }
}