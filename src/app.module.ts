import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}
