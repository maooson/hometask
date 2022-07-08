import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User as UserModel } from '.prisma/client';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../common/services/prisma.service';
import config from '../config';

describe('User Controller', () => {
  let controller: UserController;
  let spyService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
      imports: [
        JwtModule.register({
          secret: config.jwt.secretOrKey,
          signOptions: {
            expiresIn: config.jwt.expiresIn,
          },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    spyService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('Successfully create user', async () => {
      const params = { username: 'testuser01', password: 'password' };
      const result: UserModel = {
        id: 1,
        username: 'testuser01',
        passwordHash: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(spyService, 'createUser' as never)
        .mockImplementation(() => result as never);

      expect(await controller.createUser(params)).toBe(undefined);
    });
  });

  describe('deleteUser', () => {
    it('Successfully delete user', async () => {
      const result: UserModel = {
        id: 1,
        username: 'testuser01',
        passwordHash: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(spyService, 'deleteUser' as never)
        .mockImplementation(() => result as never);

      expect(await controller.deleteUser('1')).toBe(undefined);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
