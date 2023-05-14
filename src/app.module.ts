import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from '../db_typeorm';

import { ItemsModule } from 'src/modules/items-prisma/items.module';
import { ActivitiesModule } from 'src/modules/activity/activities.module';
import { BudgetsModule } from 'src/modules/budget/budgets.module';
import { PointModule } from 'src/modules/point/point.module';
import { FileModule } from 'src/modules/file/file.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { ProposalModule } from 'src/modules/proposal/proposal.module';
import { ReviewModule } from 'src/modules/review/review.module';
import { DotbitModule } from 'src/modules/dotbit/dotbit.module';
import { ToolModule } from 'src/modules/infra/infra.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/module';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './modules/identity/identity.module';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { WalletModule } from './wallet/ether.module';
import { IdentityUserManager } from './modules/identity/user.auth';

@Module({
  imports: [
    CommonModule,
    PrismaModule,
    IdentityModule,
    AuthModule.register({
      userManager: IdentityUserManager,
    }),
    CacheModule.register({
      ttl: 60 * 60 * 24 * 7, // 7 days
    }),
    WalletModule,
    ItemsModule,
    ActivitiesModule,
    BudgetsModule,
    PointModule,
    FileModule,
    NotificationModule,
    ProposalModule,
    ReviewModule,
    DotbitModule,
    ToolModule,
  ],
  providers: [],
})
export class AppModule { }

