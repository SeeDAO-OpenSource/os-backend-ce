import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from '../db_typeorm';

import { ItemsModule } from './items-prisma/items.module';
import { ActivitiesModule } from './activity/activities.module';
import { BudgetsModule } from './budget/budgets.module';
import { PointModule } from './point/point.module';
import { FileModule } from './file/file.module';
import { LinkModule } from './link/link.module';
import { NotificationModule } from './notification/notification.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProposalModule } from './proposal/proposal.module';
import { ReviewModule } from './review/review.module';

import { prisma } from '../db';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import transport from '../scripts/logger-transport';

@Module({
  imports: [
    // TypeOrmModule.forRoot(typeOrmConfig),
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // PinoLoggerModule.forRoot({
    //   pinoHttp: {
    //     transport,
    //   },
    // }),
  ],
  providers: [
    {
      provide: 'PRISMA',
      useValue: prisma,
    },
  ],

  
})
export class AppModule {}

