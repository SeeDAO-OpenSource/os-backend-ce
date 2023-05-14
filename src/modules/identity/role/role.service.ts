import { Injectable } from '@nestjs/common';
import {PrismaClient, Role } from '.prisma/client';


@Injectable()
export class RoleService {
    private prisma: PrismaClient;

    constructor() {
      this.prisma = new PrismaClient();
    }
  
  async createRole(data: Omit<Role, 'id'>): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async getRoleById(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async updateRole(id: string, data: Partial<Role>): Promise<Role> {
    return this.prisma.role.update({ where: { id }, data });
  }

  async deleteRole(id: string): Promise<Role> {
    return this.prisma.role.delete({ where: { id } });
  }
}
