import { Cache } from "cache-manager";
import { PrismaService } from "src/prisma";
import { PermissionDefinitionManager } from "./definition.manager";

export class PermissionGrantStore {

  constructor(
    protected cacheManager: Cache,
    protected prisma: PrismaService,
    protected pm: PermissionDefinitionManager) {
  }

  async isGranted(name: string, providerName: string, providerKey: string): Promise<boolean> {
    const cackeKey = this.calculateCacheKey(name, providerName, providerKey)
    const has = await this.cacheManager.get<boolean>(cackeKey)
    if (has) {
      return has
    }
    return await this.setCacheItems(name, providerName, providerKey)
  }

  protected async setCacheItems(name: string, providerName: string, providerKey: string): Promise<boolean> {
    const grants = await this.prisma.permissionGrant.findMany({
      where: {
        providerKey: providerKey,
        providerName: providerName,
      }
    })
    if (grants.length == 0) {
      return Promise.resolve(false)
    }

    const grantsSet = new Set<string>()
    grants.forEach(g => { grantsSet.add(g.name) })

    let result = false
    const permissions = Object.keys(this.pm.getPermissions())
    permissions.forEach(pn => {
      const cackeKey = this.calculateCacheKey(pn, providerName, providerKey)
      this.cacheManager.set(cackeKey, grantsSet.has(pn))
      if (grantsSet.has(pn)) {
        result = true
      }
    })

    return result
  }

  private calculateCacheKey(name: string, providerName: string, providerKey: string): string {
    return `pn:%s${providerName},pk:${providerKey},n:${name}`
  }
}