import { Cache } from "cache-manager";

export class PermissionGrantStore {

  constructor(protected cacheManager: Cache) { }

  async isGranted(name: string, providerName: string, providerKey: string): Promise<boolean> {
    const cackeKey = this.calculateCacheKey(name, providerName, providerKey)
    const has = await this.cacheManager.get<boolean>(cackeKey)
    if (has) {
      return has
    }
    return await this.setCacheItems(name, providerName, providerKey)
  }

  private setCacheItems(name: string, providerName: string, providerKey: string): Promise<boolean> {
    return Promise.resolve(false)
  }

  private calculateCacheKey(name: string, providerName: string, providerKey: string): string {
    return `pn:%s${providerName},pk:${providerKey},n:${name}`
  }
}