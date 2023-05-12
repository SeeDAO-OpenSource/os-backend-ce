import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
