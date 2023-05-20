import { Injectable } from "@nestjs/common";
import { IPermissionCheckProvider, PermissionCheckContext, PermissionGrantResult, PermissionGrantStore } from "src/permission";
import { RoleService, SUPER_ADMIN_ROLE_ID } from "./role.service";

@Injectable()
export class RolePermissionCheckProvider implements IPermissionCheckProvider {
  name: string = "R"

  constructor(
    private permissionStore: PermissionGrantStore,
    private roleService: RoleService,
  ) { }

  async check(context: PermissionCheckContext): Promise<PermissionGrantResult> {
    const currentUser = context.currentUser
    if (currentUser?.authenticated) {
      const userRoles = await this.roleService.getUserRoles(currentUser.id)
      for (const role of userRoles) {
        if (role.roleId == SUPER_ADMIN_ROLE_ID) {
          return Promise.resolve(PermissionGrantResult.Granted)
        }
        if (!role.expiredAt || role.expiredAt < new Date()) {
          const isGrant = await this.permissionStore.isGranted(context.name, this.name, role.roleId)
          if (isGrant) {
            return Promise.resolve(PermissionGrantResult.Granted)
          }
        }
      }
    }
    return Promise.resolve(PermissionGrantResult.undefined)
  }
}