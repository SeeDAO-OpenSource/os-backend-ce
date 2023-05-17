import { Body, Controller, Delete, Get, Inject, Post, Query, UnauthorizedException } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";
import { getUser } from "src/auth";
import { RoleDto } from "./role.dto";
import { AddRoleInput, RemoveRolesInput } from "./user_role.dto";
import { CountableResult } from "src/common/ddd.dto";

@Controller('user-roles')
@ApiTags('user-roles')
export class UserRoleController {
  constructor(private roleService: RoleService) { }

  @Get("")
  @ApiResponse({ status: 200, description: 'Retrieves roles.' })
  getRoles(@Inject(REQUEST) req: Request, @Query("userId") userId?: string): Promise<RoleDto[]> {
    if (!userId) {
      const currentUser = getUser(req)
      if (!currentUser.authenticated) {
        throw new UnauthorizedException()
      }
      userId = currentUser.id
    }
    return this.roleService.getRolesByUserId(userId)
  }

  @Post("")
  @ApiResponse({ status: 201, description: 'Adds roles to user.'}) 
  async addRole(@Body() input: AddRoleInput[]): Promise<CountableResult> {
    const count = await this.roleService.addRolesToUser(input)
    return new CountableResult(count)
  }

  @Delete("")
  @ApiResponse({ status: 200, description: 'Removes roles from user.'}) 
  async removeRole(@Body() input: RemoveRolesInput): Promise<CountableResult> {
    const count = await this.roleService.removeRolesFromUser(input.userId, input.roleIds)
    return new CountableResult(count)
  }
}