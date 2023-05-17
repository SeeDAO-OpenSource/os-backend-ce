import { PermissionDefinitionContext, IPermissionDefinitionProvider } from "src/permission";

const UserPermissionGroup = "user"
export const ROLE_CREATE_PERMISSION = UserPermissionGroup + ".create"
export const ROLE_UPDATE_PERMISSION = UserPermissionGroup + ".update"
export const ROLE_DELETE_PERMISSION = UserPermissionGroup + ".delete"

export class RolePermissionDefinitionProvider implements IPermissionDefinitionProvider {

  define(ctx: PermissionDefinitionContext): void {
    const group = ctx.addGroup("role", "role management")
    group.addPermission(ROLE_CREATE_PERMISSION, "Create")
    group.addPermission(ROLE_UPDATE_PERMISSION, "Update")
    group.addPermission(ROLE_DELETE_PERMISSION, "Delete")
  }
}