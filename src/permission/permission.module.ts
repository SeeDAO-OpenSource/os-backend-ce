import { Global, Module, OnModuleInit } from "@nestjs/common";
import { PermissionsGuard } from "./permission.guard";
import { PermissionDefinitionManager } from "./definition.manager";
import { PermissionOptions } from "./permission.options";
import { PermissionGrantStore } from "./permission.store";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { CacheModule } from "@nestjs/cache-manager";
import { RolesGuard } from "./role.guard";

@Global()
@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [PermissionController],
  providers: [
    PermissionDefinitionManager,
    PermissionOptions,
    PermissionGrantStore,
    PermissionService,
    PermissionsGuard,
    RolesGuard,
  ],
  exports: [
    PermissionOptions,
    PermissionDefinitionManager,
    PermissionService,
    PermissionGrantStore,
    PermissionsGuard,
    RolesGuard,
  ]
})

export class PermissionModule implements OnModuleInit {
  constructor() { }
  onModuleInit() {
  }
}