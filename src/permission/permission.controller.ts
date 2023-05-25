import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PermissionService } from "./permission.service";
import { GrantPermissionsInput, PermissionDefinitionGroupDto, UserPermissions, mapDefinitionGroupDto } from "./permission.dto";
import { CountableResult } from "src/common/ddd.dto";
import { Request } from "express";
import { Auth } from "src/auth";

/** 
 * Permission controller for managing permissions. 
 * @class 
 * @name PermissionController 
 */
@Controller("permissions")
@ApiTags("Permission")
export class PermissionController {
  /** 
  * Creates an instance of  PermissionController . 
  * @constructor 
  * @param {PermissionService} service - An instance of permission service. 
  */
  constructor(private service: PermissionService) { }

  /** 
   * Retrieves all permission definition groups. 
   * @name PermissionController#getAll 
   * @returns {Promise<PermissionDefinitionGroupDto[]>} - A promise that resolves with an array of permission definition group DTOs. 
   */
  @Get()
  async getAll(): Promise<PermissionDefinitionGroupDto[]> {
    const permissions = await this.service.getAllPermissions()
    return mapDefinitionGroupDto(permissions)
  }

  /** 
  * Grants or revokes permissions to/from a user. 
  * @name PermissionController#grantPermissions 
  * @param {GrantPermissionsInput} input - The input object containing grant details. 
  * @returns {Promise<CountableResult>} - A promise that resolves with the number of permissions granted/revoked. 
  */
  @Post("grant")
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

  /** 
  * Retrieves the user's granted permissions. 
  * @name PermissionController#getUserPermissions 
  * @param {Request} req - The request object. 
  * @returns {Promise<UserPermissions>} - A promise that resolves with an object of granted permissions. 
  */
  @Get("granted")
  @Auth()
  async getUserPermissions(@Req() req: Request): Promise<UserPermissions> {
    const permissions = await this.service.getAllPermissionMap()
    const result: UserPermissions = {}
    for (const p of Object.keys(permissions)) {
      result[p] = await this.service.isGranted(p, req)
    }
    return result
  }
}