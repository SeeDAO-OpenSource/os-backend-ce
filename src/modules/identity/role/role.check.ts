import { IPermissionCheckProvider, PermissionCheckContext, PermissionGrantResult } from "src/permission";

export class RolePermissionCheckProvider implements IPermissionCheckProvider {
  name: string = "R"

  check(context: PermissionCheckContext): Promise<PermissionGrantResult> {
    return Promise.resolve(PermissionGrantResult.undefined)
  }
  setGrants(name: string[], providerKey: string, isGranted: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }

}