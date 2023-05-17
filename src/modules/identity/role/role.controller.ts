import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateInput, RoleDto, RoleUpdateInput } from './role.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new role.' })
  async createRole(@Body() data: RoleCreateInput): Promise<RoleDto> {
    return this.roleService.createRole(data);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieves a role by id.' })
  async getRoleById(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.get(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updates a role by id.' })
  async updateRole(@Param('id') id: string, @Body() data: RoleUpdateInput): Promise<RoleDto> {
    return this.roleService.updateRole(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deletes a role by id.' })
  async deleteRole(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.deleteRole(id);
  }
}
