import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { LoginRequest, LoginResponse, SignupRequest, UserResponse } from './models';
import { Usr } from './user.decorator';
import { AuthUser } from './auth-user';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.userService.authenticate(loginRequest));
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getUserWithToken(@Usr() user: AuthUser): Promise<UserResponse> {
    return UserResponse.fromUserEntity(user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() signupRequest: SignupRequest): Promise<void> {
    await this.userService.createUser(signupRequest);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser({ id: Number(id) });
  }

  @ApiBearerAuth()
  @Post(':id/assign-role')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async assignRole(
    @Param('id', ParseIntPipe) id: number, @Body() roleIds?: [],
  ): Promise<void> {
    await this.userService.assignRole(id, {
      roles: {
        connect: roleIds?.map((roleId) => ({ id: roleId })),
      },
    });
  }
}
