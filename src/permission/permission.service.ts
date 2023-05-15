import { Injectable } from "@nestjs/common";
import { PermissionDefinitionManager } from "./definition.manager";
import { PermissionGrantStore } from "./permission.store";
import { ModuleRef } from "@nestjs/core";
import { PermissionOptions } from "./permission.options";
import { Request } from 'express'
import { IPermissionCheckProvider, PermissionCheckContext, PermissionGrantResult } from "./permission.check";
import { PermissionGroupDefinition } from "./definition.context";

@Injectable()
export class PermissionService {
  constructor(
    protected opts: PermissionOptions,
    protected defineManager: PermissionDefinitionManager,
    protected store: PermissionGrantStore,
    protected moduleRef: ModuleRef,
  ) { }

  async isGranted(name: string, req?: Request): Promise<boolean> {
    for (const checkProvider of this.opts.checkProviders) {
      const p = this.moduleRef.get<IPermissionCheckProvider>(checkProvider, { strict: false })
      const ctx = new PermissionCheckContext(name, req)
      const result = await p.check(ctx)
      if (result === PermissionGrantResult.Granted) {
        return true
      } else if (result === PermissionGrantResult.Prohibited) {
        return false
      }
    }

    return false
  }

  getAllPermissions(): Promise<PermissionGroupDefinition[]> {
    return this.defineManager.getAllPermissions()
  }
}