import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from '../db_typeorm';

import { ItemsModule } from 'src/modules/items-prisma/items.module';
import { ActivitiesModule } from 'src/modules/activity/activities.module';
import { BudgetsModule } from 'src/modules/budget/budgets.module';
import { PointModule } from 'src/modules/point/point.module';
import { FileModule } from 'src/modules/file/file.module';
import { LinkModule } from 'src/modules/link/link.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { EventModule } from 'src/modules/event/event.module';
import { UserModule } from 'src/modules/user/user.module';
import { RoleModule } from 'src/modules/role/role.module';
import { ProposalModule } from 'src/modules/proposal/proposal.module';
import { ReviewModule } from 'src/modules/review/review.module';
import { DotbitModule } from 'src/modules/dotbit/dotbit.module';
import { ToolModule } from 'src/modules/tool/module';
import { CommonModule } from 'src/common/module';
import { PrismaModule } from 'src/prisma/module';

@Module({
  imports: [
    CommonModule,
    PrismaModule,
    ItemsModule,
    ActivitiesModule,
    BudgetsModule,
    PointModule,
    FileModule,
    LinkModule,
    NotificationModule,
    EventModule,
    UserModule,
    RoleModule,
    ProposalModule,
    ReviewModule,
    DotbitModule,
    ToolModule,
  ],
  providers: [],
})
export class AppModule { }

