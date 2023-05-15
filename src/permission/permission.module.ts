import { Global, Module, OnModuleInit } from "@nestjs/common";
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
    PermissionDefinitionManager,
    PermissionOptions,
    PermissionGrantStore,
    PermissionService,
    PermissionsGuard,
  ],
  exports: [
    PermissionOptions,
    PermissionDefinitionManager,
    PermissionService,
    PermissionGrantStore,
    PermissionsGuard,
  ]
})

export class PermissionModule implements OnModuleInit {
  constructor() { }
  onModuleInit() {
  }
}