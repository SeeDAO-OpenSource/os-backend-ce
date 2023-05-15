import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/prisma';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() data: Omit<Role, 'id'>): Promise<Role> {
    return this.roleService.createRole(data);
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<Role> {
    return this.roleService.getRoleById(id);
  }

  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() data: Partial<Role>): Promise<Role> {
    return this.roleService.updateRole(id, data);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<Role> {
    return this.roleService.deleteRole(id);
  }
}
