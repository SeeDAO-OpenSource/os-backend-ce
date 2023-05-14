import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PermissionService } from "./permission.service";
import { Permissions } from "./permission.guard";
import { PermissionDefinitionGroupDto, mapDefinitionGroupDto } from "./permission.dtos";


@Controller("permissions")
@ApiTags("Permission")
export class PermissionController {
  constructor(private service: PermissionService) { }

  @Get()
  @ApiResponse({ type: PermissionDefinitionGroupDto, status: 200 })
  @Permissions("Admin")
  async getAll(): Promise<PermissionDefinitionGroupDto[]> {
    const permissions = await this.service.getAllPermissions()
    return mapDefinitionGroupDto(permissions)
  }
}