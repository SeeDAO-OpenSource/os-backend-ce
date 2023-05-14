import { Injectable, Type } from "@nestjs/common";
import { PermissionDefinitionProvider } from "./definition.manager";
import { IPermissionCheckProvider } from "./permission.check";

@Injectable()
export class PermissionOptions {
  definitionProviders: Array<Type<PermissionDefinitionProvider>> = []
  checkProviders: Array<Type<IPermissionCheckProvider>> = []

  addDefinitionProvider(p: Type<PermissionDefinitionProvider>) {
    this.definitionProviders.push(p)
  }

  addCheckProvider(p: Type<IPermissionCheckProvider>) {
    this.checkProviders.push(p)
  }
}