// user.module.ts
import { Global, Module, OnModuleInit, Provider } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { RoleController, RolePermissionCheckProvider, RolePermissionDefinitionProvider } from './role';
import { UserManager } from 'src/auth/auth.user';
import { IdentityUserManager, UserPermissionDefinitionProvider } from './user';
import { ModuleRef } from '@nestjs/core';
import { PermissionModule, PermissionOptions } from 'src/permission';


const providers: Provider[] = [
  UserService,
  RoleService,
  {
    provide: UserManager,
    useClass: IdentityUserManager,
  },
  UserPermissionDefinitionProvider,
  RolePermissionCheckProvider,
  RolePermissionDefinitionProvider,
]

@Global()
@Module({
  controllers: [UserController, RoleController],
  providers: providers,
  exports: providers,
})
export class IdentityModule implements OnModuleInit {
  constructor(private permissionOpts: PermissionOptions) { }
  onModuleInit() {
    this.permissionOpts.addDefinitionProvider(UserPermissionDefinitionProvider)
    this.permissionOpts.addDefinitionProvider(RolePermissionDefinitionProvider)
    this.permissionOpts.addCheckProvider(RolePermissionCheckProvider)
  }
}