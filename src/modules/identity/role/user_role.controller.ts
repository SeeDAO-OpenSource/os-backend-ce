import { Body, Controller, Delete, Get, Inject, Post, Put, Query, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";
import { getUser } from "src/auth";
import { RoleDto } from "./role.dto";
import { AddUserRolesInput as AddRolesInput, RemoveUserRolesInput, UpdateUserRoleInput } from "./user_role.dto";
import { CountableResult } from "src/common/ddd.dto";
import { PermissionService, Permissions } from "src/permission";
import { UserRolePermissions } from "./role.permission";

@Controller('user-roles')
@ApiTags('user-roles')
export class UserRoleController {
  constructor(private roleService: RoleService, private permissionService: PermissionService) { }

  /**
   * Get roles of user
   * @param req 
   * @param userId  
   * @returns 
   */
  @Get("")
  getRoles(@Inject(REQUEST) req: Request, @Query("userId") userId?: string): Promise<RoleDto[]> {
    if (!userId) {
      // check permission
      this.permissionService.checkAsync(UserRolePermissions.Get, req)
      userId = getUser(req).id
    }
    return this.roleService.getRolesByUserId(userId)
  }

  /**
   * Add roles to user
   * @param input roles to add
   * @returns count of roles added
   */
  @Post("")
  @Permissions(UserRolePermissions.Add)
  async addRole(@Body() input: AddRolesInput): Promise<CountableResult> {
    const data = input.roleIds.map(roleId => (
      {
        userId: input.userId,
        roleId,
        expiredAt: input.expiredAt
      }))
    const count = await this.roleService.addRolesToUser(data)
    return new CountableResult(count)
  }

  /**
   * Update role of user
   * @param input roles to update
   * @returns count of roles updated
   */
  @Put("")
  async updateRole(@Body() input: UpdateUserRoleInput): Promise<CountableResult> {
    const count = await this.roleService.updateUserRole(input.userId, input.roleId, input.expiredAt)
    return new CountableResult(1)
  }

  /**
   * Remove roles from user
   * @param input roles to remove
   * @returns count of roles removed
   */
  @Delete("")
  @Permissions(UserRolePermissions.Remove)
  async removeRole(@Body() input: RemoveUserRolesInput): Promise<CountableResult> {
    const count = await this.roleService.removeRolesFromUser(input.userId, input.roleIds)
    return new CountableResult(count)
  }
}