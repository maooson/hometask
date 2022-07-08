import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role as RoleModel } from '@prisma/client';
import { RoleService } from './role.service';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getRoles(): Promise<RoleModel[]> {
    return this.roleService.findRoles({});
  }

  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard())
  async createRole(
    @Body() roleData: { name: string; },
  ): Promise<RoleModel> {
    const { name } = roleData;
    return this.roleService.createRole({
      name,
    });
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async deleteRole(@Param('id') id: string): Promise<RoleModel> {
    return this.roleService.deleteRole({ id: Number(id) });
  }
}
