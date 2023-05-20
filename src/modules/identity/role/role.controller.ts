import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateInput, RoleDto, RoleUpdateInput } from './role.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolePermissions } from './role.permission';
import { Permissions } from 'src/permission'
import { UserDto } from '../user/user.dto';
import { ApiPagedResultResponse, PageAndSort, PagedResult, queryPage as QueryPage } from 'src/common';

/** 
 * Controller for managing roles. 
 * @class 
 * @name RoleController 
 * @param {RoleService} roleService - Instance of RoleService. 
 */
@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  /** 
   * Creates a new role. 
   * @method 
   * @name createRole 
   * @async 
   * @param {RoleCreateInput} data - Role information to be created. 
   * @returns {Promise<RoleDto>} Promise representing the created Role. 
   */
  @Post()
  @Permissions(RolePermissions.Create)
  async createRole(@Body() data: RoleCreateInput): Promise<RoleDto> {
    return this.roleService.createRole(data);
  }

  /** 
   * Retrieves a role by ID. 
   * @method 
   * @name getRoleById 
   * @async 
   * @param {string} id - ID of the role to retrieve. 
   * @returns {Promise<RoleDto>} Promise representing the retrieved Role. 
   */
  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.get(id);
  }

  /** 
   * Retrieves users associated with a role. 
   * @method 
   * @name getRoleUsers 
   * @async 
   * @param {string} id - ID of the role. 
   * @param {PageAndSort} page - Pagination and sorting information. 
   * @returns {Promise<PagedResult<UserDto>>} Promise representing the retrieved users. 
   */
  @Get(':id/users')
  @ApiPagedResultResponse(UserDto)
  async getRoleUsers(@Param('id') id: string, @QueryPage() page: PageAndSort): Promise<PagedResult<UserDto>> {
    return this.roleService.getUsersByRoleId(id, page);
  }

  /** 
   * Updates a role by ID. 
   * @method 
   * @name updateRole 
   * @async 
   * @param {string} id - ID of the role to update. 
   * @param {RoleUpdateInput} data - New role information to update. 
   * @returns {Promise<RoleDto>} Promise representing the updated Role. 
   */
  @Put(':id')
  @Permissions(RolePermissions.Update)
  async updateRole(@Param('id') id: string, @Body() data: RoleUpdateInput): Promise<RoleDto> {
    return this.roleService.updateRole(id, data);
  }

  /** 
   * Deletes a role by ID. 
   * @method 
   * @name deleteRole 
   * @async 
   * @param {string} id - ID of the role to delete. 
   * @returns {Promise<RoleDto>} Promise representing the deleted Role. 
   */
  @Delete(':id')
  @Permissions(RolePermissions.Delete)
  async deleteRole(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.deleteRole(id);
  }
}
