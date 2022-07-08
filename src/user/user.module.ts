import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../common/services/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import config from '../config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.jwt.secretOrKey,
      signOptions: {
        expiresIn: config.jwt.expiresIn,
      },
    }),
  ],
  providers: [UserService, JwtStrategy, PrismaService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {
}
