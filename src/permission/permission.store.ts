import { Cache } from "cache-manager";
import { PermissionGrant, PrismaService } from "src/prisma";
import { PermissionDefinitionManager } from "./definition.manager";
import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

class GrantCacheItem {
  isGranted: boolean
  expiredAt?: Date | null
  constructor(isGranted: boolean, expiredAt: Date) {
    this.isGranted = isGranted
    this.expiredAt = expiredAt
  }

  get granted(): boolean {
    return this.isGranted && isGranted(this)
  }
}

function isGranted(grant: { expiredAt?: Date }): boolean {
  return grant.expiredAt === null || grant.expiredAt > new Date()
}

@Injectable()
export class PermissionGrantStore {
  constructor(
    protected prisma: PrismaService,
    protected pm: PermissionDefinitionManager,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {
  }

  async isGranted(name: string, providerName: string, providerKey: string): Promise<boolean> {
    const cackeKey = this.calculateCacheKey(name, providerName, providerKey)
    const has = await this.cacheManager.get<GrantCacheItem>(cackeKey)
    if (has) {
      return has.granted
    }
    return await this.setCacheItems(name, providerName, providerKey)
  }

  async setGrants(grants: PermissionGrant[], isGranted: boolean): Promise<number> {
    let count = 0
    if (isGranted) {
      const result = await this.prisma.permissionGrant.createMany({
        data: grants,
        skipDuplicates: true,
      })
      count = result.count
    } else {
      const result = await this.prisma.permissionGrant.deleteMany({
        where: {
          name: {
            in: grants.map(g => g.name)
          },
          providerKey: grants[0].providerKey,
          providerName: grants[0].providerName,
        }
      })
      count = result.count
      for (const p of grants) {
        await this.setCacheItem(p, false)
      }
    }
    return count
  }

  protected async setCacheItems(name: string, providerName: string, providerKey: string): Promise<boolean> {
    const grants = await this.prisma.permissionGrant.findMany({
      where: {
        providerKey: providerKey,
        providerName: providerName,
      }
    })

    const grantsSet = new Map<string, PermissionGrant>()
    grants.forEach(g => { grantsSet.set(g.name, g) })

    const permissions = Object.keys(this.pm.getPermissions())
    for (const pn of permissions) {
      const grant = grantsSet.get(pn)
      if (grant) {
        await this.setCacheItem(grant, true)
      }
    }
    const grant = grantsSet.get(name)
    return grant && isGranted(grant)
  }

  protected async setCacheItem(grant: PermissionGrant, isGranted: boolean) {
    const cackeKey = this.calculateCacheKey(grant.name, grant.providerName, grant.providerKey)
    await this.cacheManager.set(cackeKey, new GrantCacheItem(isGranted, grant.expiredAt), 0)
  }

  private calculateCacheKey(name: string, providerName: string, providerKey: string): string {
    return `pn:%s${providerName},pk:${providerKey},n:${name}`
  }
}
