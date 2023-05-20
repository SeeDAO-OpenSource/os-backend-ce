import { PermissionDefinitionContext, IPermissionDefinitionProvider } from "src/permission";

export enum RolePermissions {
  Name = "role",
  Create = "role.create",
  Update = "role.update",
  Delete = "role.delete",
}

export enum UserRolePermissions {
  Name = "userRole",
  Get = "userRole.get",
  Add = "userRole.add",
  Remove = "userRole.remove",
}

export class RolePermissionDefinitionProvider implements IPermissionDefinitionProvider {

  define(ctx: PermissionDefinitionContext): void {
    const group = ctx.addGroup(RolePermissions.Name, "role management")
    group.addPermission(RolePermissions.Create, "Create")
    group.addPermission(RolePermissions.Update, "Update")
    group.addPermission(RolePermissions.Delete, "Delete")

    const userRoleGroup = ctx.addGroup(UserRolePermissions.Name, "user role management")
    userRoleGroup.addPermission(UserRolePermissions.Get, "Get roles of another user")
    userRoleGroup.addPermission(UserRolePermissions.Add, "Add role to user")
    userRoleGroup.addPermission(UserRolePermissions.Remove, "Remove role from user")
  }
}