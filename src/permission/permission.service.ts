import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PermissionDefinitionManager, PermissionMap } from "./definition.manager";
import { PermissionGrantStore } from "./permission.store";
import { ModuleRef } from "@nestjs/core";
import { PermissionOptions } from "./permission.options";
import { Request } from 'express'
import { IPermissionCheckProvider, PermissionCheckContext, PermissionGrantResult } from "./permission.check";
import { PermissionGroupDefinition } from "./definition.context";
import { PermissionGrant } from "src/prisma";
import { IdGenerator } from "src/common";

@Injectable()
export class PermissionService {
  constructor(
    protected opts: PermissionOptions,
    protected defineManager: PermissionDefinitionManager,
    protected store: PermissionGrantStore,
    protected moduleRef: ModuleRef,
    protected idGenerator: IdGenerator,
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

  async checkAsync(name: string, req?: Request): Promise<void> {
    const granted = await this.isGranted(name, req)
    if (!granted) {
      throw new UnauthorizedException()
    }
  }

  getAllPermissions(): Promise<PermissionGroupDefinition[]> {
    return this.defineManager.getAllPermissions()
  }

  getAllPermissionMap(): Promise<PermissionMap> {
    const permissions = this.defineManager.getPermissions()
    return Promise.resolve(permissions)
  }

  setGrants(grants: Omit<PermissionGrant, "id">[], isGranted: boolean): Promise<number> {
    const providerName = grants[0].providerName
    const providerKey = grants[0].providerKey
    const same = grants.some(g => g.providerName !== providerName || g.providerKey !== providerKey)
    if (same) {
      throw new Error('providerKey and providerName must be same')
    }
    const p = this.getCheckProvider(providerName)
    if (!p) {
      throw new Error(`provider ${providerName} not found`)
    }
    const data = grants.map(g => ({
      id: this.idGenerator.create(),
      ...g,
    }))
    return this.store.setGrants(data, isGranted)
  }

  protected getCheckProvider(providerName: string): IPermissionCheckProvider | null {
    for (const checkProvider of this.opts.checkProviders) {
      const p = this.moduleRef.get<IPermissionCheckProvider>(checkProvider, { strict: false })
      if (p.name === providerName) {
        return p
      }
    }
    return null
  }
}