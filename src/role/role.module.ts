import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [RoleController],
  providers: [RoleService, PrismaService],
  exports: [RoleService],
})
export class RoleModule {
}
