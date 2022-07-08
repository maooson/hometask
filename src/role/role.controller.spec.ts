import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { Role as RoleModel } from '.prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

describe('RolesController', () => {
  let controller: RoleController;
  let spyService: RoleService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [RoleService, PrismaService],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    }).compile();

    controller = moduleRef.get<RoleController>(RoleController);
    spyService = moduleRef.get<RoleService>(RoleService);
  });

  describe('getRoles', () => {
    it('should return an array of roles', async () => {
      const result: RoleModel[] = [
        {
          id: 1,
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest
        .spyOn(spyService, 'findRoles' as never)
        .mockImplementation(() => result as never);

      expect(await controller.getRoles()).toBe(result);
    });
  });

  describe('createRole', () => {
    it('Successfully create role', async () => {
      const params = { name: 'Admin' };
      const result: RoleModel = {
        id: 1,
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(spyService, 'createRole' as never)
        .mockImplementation(() => result as never);

      expect(await controller.createRole(params)).toBe(result);
    });
  });

  describe('deleteRole', () => {
    it('Successfully delete role', async () => {
      const result: RoleModel = {
        id: 1,
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(spyService, 'deleteRole' as never)
        .mockImplementation(() => result as never);

      expect(await controller.deleteRole('1')).toBe(result);
    });
  });
});
