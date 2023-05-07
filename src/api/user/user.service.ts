import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 

import {
  User,
  Role,
  SystemUser,
  AuthGoogle,
  AuthTwitter,
  AuthDiscord,
  AuthGithub,
  AuthTelegram,
  AuthWechat,
  AuthZoom,
} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async quickGetList(data: any): Promise<User[]> {
    return this.prisma.user.findMany({ where: { ...data } });
  }

  async findUserByWallet(wallet: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { wallet } });
  }

  async findSystemUser(username: string): Promise<SystemUser | null> {
    return this.prisma.systemUser.findUnique({ where: { username } });
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

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    await this.prisma.user.delete({ where: { id } });
    return user;
  }

  async createNormalUser(wallet: string, sysuserId: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        wallet,
        // systemUser: {
        //   connect: {
        //     id: sysuserId,
        //   },
        // },
      },
    });
  }

  async createSystemUser(username: string): Promise<SystemUser> {
    return this.prisma.systemUser.create({
      data: {
        username: username,
      },
    });
  }

  async addSystemUserRole(sysuser: SystemUser, role: Role): Promise<SystemUser> {
    return this.prisma.systemUser.update({
      where: { id: sysuser.id },
      data: { roles: { connect: { id: role.id } } },
    });
  }


  async createUser(wallet: string): Promise<User> {
    await this.createSystemUser(wallet);
    const sysuser = await this.findSystemUser(wallet);
    const guestRole = await this.findRole('guest');
    await this.addSystemUserRole(sysuser, guestRole);
    return this.createNormalUser(wallet, sysuser.id);
  }
  // Add other functions...
}