import { Inject, Injectable } from "@nestjs/common";
import { ModuleRef, REQUEST } from "@nestjs/core";
import { Cache } from "cache-manager";
import { CurrentUser, getUser } from "src/auth";
import { IPermissionCheckProvider, PermissionCheckContext, PermissionGrantResult, PermissionGrantStore } from "src/permission";

@Injectable()
export class RolePermissionCheckProvider implements IPermissionCheckProvider {
  name: string = "R"

  constructor(
    private permissionStore: PermissionGrantStore,
  ) {
  }

  async check(context: PermissionCheckContext): Promise<PermissionGrantResult> {
    const currentUser = getUser(context.request)
    if (currentUser?.authenticated) {
      return Promise.resolve(PermissionGrantResult.Granted)
    }
    return Promise.resolve(PermissionGrantResult.undefined)
  }
  setGrants(name: string[], providerKey: string, isGranted: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }

}