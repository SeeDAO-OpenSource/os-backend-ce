import { Body, Controller, Get, Inject, Post, Query, UnauthorizedException } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PermissionService } from "./permission.service";
import { GrantPermissionsInput, PermissionDefinitionGroupDto, UserPermissions, mapDefinitionGroupDto } from "./permission.dtos";
import { CountableResult } from "src/common/ddd.dto";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { Auth, getUser } from "src/auth";


@Controller("permissions")
@ApiTags("Permission")
export class PermissionController {
  constructor(private service: PermissionService) { }

  @Get()
  @ApiResponse({ type: PermissionDefinitionGroupDto, status: 200 })
  async getAll(): Promise<PermissionDefinitionGroupDto[]> {
    const permissions = await this.service.getAllPermissions()
    return mapDefinitionGroupDto(permissions)
  }

  @Post("grant")
  @ApiResponse({ type: CountableResult, status: 200 })
  async grantPermissions(@Body() input: GrantPermissionsInput): Promise<CountableResult> {
    const grants = input.permissions.map(p => {
      return {
        name: p,
        providerKey: input.providerKey,
        providerName: input.providerName,
        expiredAt: input.expiredAt ?? null,
      }
    })
    const count = await this.service.setGrants(grants, input.isGranted)
    return new CountableResult(count)
  }

  @Get("granted")
  @ApiResponse({ type: Boolean, status: 200, description: "获取用户权限, 如果不指定UuserId, 则是当前用户" })
  @Auth()
  async getUserPermissions(@Inject(REQUEST) req: Request): Promise<UserPermissions> {
    const permissions = await this.service.getAllPermissionMap()
    const result: UserPermissions = {}
    for (const p of Object.keys(permissions)) {
      result[p] = await this.service.isGranted(p, req)
    }
    return result
  }
}