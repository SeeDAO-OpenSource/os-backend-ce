import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { PermissionOptions } from "./permission.options";
import { PermissionDefinition, PermissionDefinitionContext, PermissionGroupDefinition } from "./definition.context";


export type PermissionMap = { [key: string]: PermissionDefinition }

export interface IPermissionDefinitionProvider {
  define(ctx: PermissionDefinitionContext): void
}

@Injectable()
export class PermissionDefinitionManager {
  protected ctx: PermissionDefinitionContext | null

  get definitionContext() {
    if (this.ctx == null) {
      this.ctx = this.createContext()
    }
    return this.ctx
  }

  constructor(protected opts: PermissionOptions, private mr: ModuleRef) {
  }

  getPermissions(): PermissionMap {
    const result = {}
    const dc = this.definitionContext
    for (const p in dc.groups) {
      this.getPermissionsRecursively(result, dc.groups[p].permissions)
    }
    return result
  }

  getAllPermissions(): Promise<PermissionGroupDefinition[]> {
    const dc = this.definitionContext
    return Promise.resolve(Object.values(dc.groups))
  }

  private createContext(): PermissionDefinitionContext {
    const ctx = new PermissionDefinitionContext()
    this.opts.definitionProviders.forEach(p => {
      const provider = this.mr.get(p, { strict: false })
      provider.define(ctx)
    })
    return ctx
  }

  private getPermissionsRecursively(map: PermissionMap, permissions: PermissionDefinition[]) {
    permissions.forEach((v) => {
      map[v.name] = v
      if (v.children.length > 0) {
        this.getPermissionsRecursively(map, v.children)
      }
    })
  }


}