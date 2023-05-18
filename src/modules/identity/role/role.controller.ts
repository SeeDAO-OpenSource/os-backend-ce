import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateInput, RoleDto, RoleUpdateInput } from './role.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolePermissions } from './role.permission';
import { Permissions } from 'src/permission'

@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @Permissions(RolePermissions.Create)
  async createRole(@Body() data: RoleCreateInput): Promise<RoleDto> {
    return this.roleService.createRole(data);
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.get(id);
  }

  @Put(':id')
  @Permissions(RolePermissions.Update)
  async updateRole(@Param('id') id: string, @Body() data: RoleUpdateInput): Promise<RoleDto> {
    return this.roleService.updateRole(id, data);
  }

  @Delete(':id')
  @Permissions(RolePermissions.Delete)
  async deleteRole(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.deleteRole(id);
  }
}
