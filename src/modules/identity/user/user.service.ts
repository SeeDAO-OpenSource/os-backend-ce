import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';

import {
  User,
  Role,
} from '@prisma/client';
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

  async findRole(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async findUsersById(ids: string[]): Promise<User[]> {
    return this.prisma.user.findMany({ where: { id: { in: ids } } });
  }

  async updateUser(wallet: string, data: any): Promise<User> {
    return this.prisma.user.update({ where: { wallet }, data });
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