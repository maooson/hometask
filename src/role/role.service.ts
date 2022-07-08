import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Role as RoleModel, Prisma } from "@prisma/client";

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  async findRoleById(id: number): Promise<RoleModel | null> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async findRoles(params: { where?: Prisma.RoleWhereInput }): Promise<RoleModel[]> {
    const { where } = params;
    return this.prisma.role.findMany({ where });
  }

  async createRole(data: Prisma.RoleCreateInput): Promise<RoleModel> {
    return this.prisma.role.create({ data });
  }

  async updateRole(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<RoleModel> {
    const { data, where } = params;
    return this.prisma.role.update({ data, where });
  }

  async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<RoleModel> {
    return this.prisma.role.delete({ where });
  }
}
