import { Module } from '@nestjs/common';

import { ToolModule } from 'src/modules/infra/infra.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/module';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './modules/identity/identity.module';
import { CacheModule } from '@nestjs/cache-manager';
import { WalletModule } from './wallet/ether.module';
import { IdentityUserManager } from './modules/identity/user/user.auth';
import { PermissionModule } from './permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { ProposalModule } from 'src/modules/proposal/proposal.module';
import { BudgetModule } from 'src/modules/budget/budget.module';
import { TaskModule } from 'src/modules/task/task.module';
import { ProjectModule } from 'src/modules/project/project.module';
import { AttenderModule } from 'src/modules/attender/attender.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development','.env'],
      isGlobal: true,
    }),
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
    ProposalModule,
    BudgetModule,
    TaskModule,
    ProjectModule,
    AttenderModule,
  ],
  providers: [],

})
export class AppModule { }

