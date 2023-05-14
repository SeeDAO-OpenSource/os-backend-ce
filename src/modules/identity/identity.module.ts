// user.module.ts
import { Global, Module, Provider } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { UserManager } from 'src/auth/auth.user';
import { IdentityUserManager } from './user.auth';

const providers: Provider[] = [
  UserService,
  RoleService,
  {
    provide: UserManager,
    useClass: IdentityUserManager,
  }
]

@Global()
@Module({
  controllers: [UserController, RoleController],
  providers: providers,
  exports: providers,
})
export class IdentityModule { }