import { PermissionDefinitionContext, IPermissionDefinitionProvider } from "src/permission";

const UserPermissionGroup = "user"
export const USER_CREATE_PERMISSION = UserPermissionGroup + ".create"
export const USER_UPDATE_PERMISSION = UserPermissionGroup + ".update"
export const USER_DELETE_PERMISSION = UserPermissionGroup + ".delete"

export class UserPermissionDefinitionProvider implements IPermissionDefinitionProvider {

  define(ctx: PermissionDefinitionContext): void {
    const group = ctx.addGroup("user", "user management")
    group.addPermission(USER_CREATE_PERMISSION, "Create")
    group.addPermission(USER_UPDATE_PERMISSION, "Update")
    group.addPermission(USER_DELETE_PERMISSION, "Delete")
  }
}