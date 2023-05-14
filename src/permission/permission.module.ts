import { Global, Module, OnModuleInit } from "@nestjs/common";
import { APP_GUARD, ModuleRef } from "@nestjs/core";
import { RolesGuard } from "./role.guard";
import { PermissionsGuard } from "./permission.guard";
import { PermissionDefinitionManager } from "./definition.manager";
import { PermissionOptions } from "./permission.options";
import { PermissionGrantStore } from "./permission.store";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";

@Global()
@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    PermissionDefinitionManager,
    PermissionOptions,
    PermissionGrantStore,
    PermissionService,
  ],
  exports: [
    PermissionOptions,
    PermissionDefinitionManager,
    PermissionService,
  ]
})

export class PermissionModule implements OnModuleInit {
  constructor(private mref: ModuleRef) { }
  onModuleInit() {
  }
}