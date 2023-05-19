import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IdGenerator } from 'src/common';
import { PrismaService, Role, UserRole } from 'src/prisma';

export const SUPER_ADMIN_ROLE_ID = 'super-admin';

/** 
 * RoleService class that handles CRUD operations for roles. 
 */
@Injectable()
export class RoleService {
  constructor(
    private idGenerator: IdGenerator,
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) protected cache: Cache,
  ) { }

  /** 
    * Creates a new role in the database with the provided data. 
    * 
    * @param data The data for the role to be created, excluding the 'id' field. 
    * @returns A Promise that resolves to the newly created role. 
    */
  async createRole(data: Omit<Role, 'id'>): Promise<Role> {
    const role: Role = {
      id: this.idGenerator.create(),
      ...data,
    }
    return this.prisma.role.create({ data: role });
  }

  /** 
  * Finds and returns the role with the specified id. 
  * 
  * @param id The id of the role to be retrieved. 
  * @returns A Promise that resolves to the role if found, or null if not found. 
  */
  async get(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  /** 
  * Updates the role with the specified id with the provided data. 
  * 
  * @param id The id of the role to be updated. 
  * @param data The data to update the role with. 
  * @returns A Promise that resolves to the updated role. 
  */
  async updateRole(id: string, data: Partial<Role>): Promise<Role> {
    return this.prisma.role.update({ where: { id }, data });
  }

  /** 
 * Deletes the role with the specified id. 
 * 
 * @param id The id of the role to be deleted. 
 * @returns A Promise that resolves to the deleted role. 
 */
  async deleteRole(id: string): Promise<Role> {
    const role = await this.prisma.role.delete({ where: { id } });
    const result = await this.prisma.userRole.deleteMany({ where: { roleId: id } });
    if (result.count > 0) {
      const cacheKey = this.calculateCacheKey(role.id);
      await this.cache.del(cacheKey);
    }
    return role;
  }

  /** 
  * Retrieves all user roles associated with the specified user id. 
  * 
  * @param userId The id of the user whose roles are to be retrieved. 
  * @returns A Promise that resolves to an array of UserRole objects. 
  */
  async getUserRoles(userId: string): Promise<UserRole[]> {
    const userRoles = await this.getUserRolesFromCache(userId);
    return userRoles.filter(x => !x.expiredAt || x.expiredAt > new Date())
  }

  /** 
   * Retrieves all roles associated with the specified user id. 
   * 
   * @param userId The id of the user whose roles are to be retrieved. 
   * @returns A Promise that resolves to an array of Role objects. 
   */
  async getRolesByUserId(userId: string): Promise<Role[]> {
    const userRoles = await this.getUserRoles(userId);
    const roleIds = userRoles.map(x => x.roleId);
    const roles = await this.prisma.role.findMany({ where: { id: { in: roleIds } } });
    return roles;
  }

  /** 
   * Adds user roles to the database. 
   * 
   * @param userRoles An array of UserRole objects to be added. 
   * @returns A Promise that resolves to the number of user roles that were added. 
   */
  async addRolesToUser(userRoles: Omit<UserRole, "createdAt" | "id">[]): Promise<number> {
    if (userRoles.length === 0) {
      return;
    }
    const userId = userRoles[0].userId;
    const result = await this.prisma.userRole.createMany({ data: userRoles });
    const cacheKey = this.calculateCacheKey(userId);
    await this.cache.del(cacheKey);
    return result.count;
  }

  /** 
   * Removes user roles from the database. 
   * 
   * @param userId The id of the user whose roles are to be removed. 
   * @param roleIds An array of role ids to be removed. 
   * @returns A Promise that resolves to the number of user roles that were removed. 
   */
  async removeRolesFromUser(userId: string, roleIds: string[]): Promise<number> {
    if (roleIds.length === 0) {
      return;
    }
    const userRoles = roleIds.map(r => ({ userId, roleId: r }))
    const result = await this.prisma.userRole.deleteMany({
      where: { OR: userRoles }
    });
    const cacheKey = this.calculateCacheKey(userId);
    await this.cache.del(cacheKey);
    return result.count;
  }

  protected async getUserRolesFormDb(userId: string): Promise<UserRole[]> {
    const userRoles = await this.prisma.userRole.findMany({ where: { userId } });
    return userRoles;
  }

  protected async getUserRolesFromCache(userId: string): Promise<UserRole[]> {
    const cachekey = this.calculateCacheKey(userId);
    let userRoles = await this.cache.get<UserRole[]>(cachekey);
    if (userRoles) {
      return userRoles;
    }
    userRoles = await this.getUserRolesFormDb(userId);
    await this.cache.set(cachekey, userRoles, 0);
    return userRoles;
  }

  protected calculateCacheKey(userId: string): string {
    return `roles:${userId}`;
  }
}
