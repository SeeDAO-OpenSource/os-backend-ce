import { Injectable, Type } from "@nestjs/common";
import { IPermissionDefinitionProvider } from "./definition.manager";
import { IPermissionCheckProvider } from "./permission.check";

@Injectable()
export class PermissionOptions {
  definitionProviders: Array<Type<IPermissionDefinitionProvider>> = []
  checkProviders: Array<Type<IPermissionCheckProvider>> = []

  addDefinitionProvider(p: Type<IPermissionDefinitionProvider>) {
    this.definitionProviders.push(p)
  }

  addCheckProvider(p: Type<IPermissionCheckProvider>) {
    this.checkProviders.push(p)
  }
}