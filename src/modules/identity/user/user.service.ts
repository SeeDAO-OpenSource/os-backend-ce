import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PrismaService, User,
  Role,
} from 'src/prisma';

import { PageAndSort, PagedResult } from 'src/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async getList(data: PageAndSort): Promise<PagedResult<User>> {
    return this.prisma.getPaged(this.prisma.user, data);
  }

  async findUserByWallet(wallet: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { wallet } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findRole(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async findUsersById(ids: string[]): Promise<User[]> {
    return this.prisma.user.findMany({ where: { id: { in: ids } } });
  }

  async updateUser(id: string, data: User): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  // async deleteUser(id: string): Promise<User | null> {
  //   const user = await this.prisma.user.findUnique({ where: { id } });
  //   if (!user) {
  //     return null;
  //   }
  //   await this.prisma.user.delete({ where: { id } });
  //   return user;
  // }

  async createUser(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
}