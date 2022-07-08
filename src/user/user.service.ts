import {
  ConflictException,
  Injectable, Logger, UnauthorizedException, NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { AuthUser } from './auth-user';
import { LoginRequest, SignupRequest, UserResponse } from './models';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
  }

  async authenticate(loginRequest: LoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.username.toLowerCase();
    const user = await this.prisma.user.findFirst({
      where: {
        username: normalizedIdentifier,
      },
      select: {
        id: true,
        username: true,
        passwordHash: true,
      },
    });

    if (
      user === null
      || !bcrypt.compareSync(loginRequest.password, user.passwordHash)
    ) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
    };

    return this.jwtService.signAsync(payload);
  }

  async createUser(signupRequest: SignupRequest): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          username: signupRequest.username.toLowerCase(),
          passwordHash: await bcrypt.hash(signupRequest.password, 10),
        },
        select: null,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // unique constraint
          throw new ConflictException();
        } else throw e;
      } else throw e;
    }
  }

  async validateUser(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (
      user !== null
      && user.username === payload.username
    ) {
      return user;
    }

    throw new UnauthorizedException();
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<void> {
    try {
      const user = await this.prisma.user.delete({ where });

      if (user === null) {
        throw new NotFoundException();
      }
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  async assignRole(userId: number, data: Prisma.UserUpdateInput): Promise<UserResponse> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data,
      });

      return UserResponse.fromUserEntity(updatedUser);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }
}
