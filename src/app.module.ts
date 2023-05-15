import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from '../db_typeorm';

import { ToolModule } from 'src/modules/infra/infra.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/module';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './modules/identity/identity.module';
import { CacheModule } from '@nestjs/cache-manager';
import { WalletModule } from './wallet/ether.module';
import { IdentityUserManager } from './modules/identity/user/user.auth';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    CommonModule,
    PrismaModule,
    PermissionModule,
    AuthModule.register({
      userManager: IdentityUserManager,
    }),
    IdentityModule,
    CacheModule.register({
      ttl: 60 * 60 * 24 * 7, // 7 days
    }),
    WalletModule,
    ToolModule,

  ],
  providers: [],

})
export class AppModule { }

