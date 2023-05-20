import { Body, Controller, Get, Inject, NotFoundException, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserListInput, UpdateUserInput, UserDto, mapToUser } from './user.dto';
import { PagedResult, queryPage as PagedQuery, ApiPagedResultResponse } from 'src/common';
import { PermissionService } from 'src/permission';
import { UserPermissions } from './user.permission';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { getUser as getCurrentUser } from 'src/auth';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService, private permissionService: PermissionService) { }

  /** 
   * Retrieves a list of users from a data source, with optional pagination. 
   * @function 
   * @name getList 
   * @param {GetUserListInput} page - The input parameters specifying the current page and any applicable filters/sorting. 
   * @returns {Promise<PagedResult<UserDto>>} - A Promise containing the paged result of users retrieved from the data source. 
   */
  @Get("")
  @ApiPagedResultResponse(UserDto)
  async getList(@PagedQuery() page: GetUserListInput): Promise<PagedResult<UserDto>> {
    const data = await this.userService.getList(page);
    const result = new PagedResult<UserDto>([], data.hasMore, data.total);
    result.items = data.items.map((x) => new UserDto(x));
    return result;
  }

  /**
   * Get user by id
   * @param id  user id
   * @param data udpate data
   * @returns user
   */
  @Put(':id')
  async update(@Param("id") id: string, @Body() data: UpdateUserInput, @Inject(REQUEST) req: Request): Promise<UserDto> {
    const currentUser = getCurrentUser(req);
    if (currentUser.id !== id) {
      await this.permissionService.checkAsync(UserPermissions.Update, req);
    }
    let user = await this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    mapToUser(data, user);
    user = await this.userService.updateUser(id, user);
    return new UserDto(user);
  }

}

