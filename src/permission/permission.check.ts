import { CurrentUser, JwtUserClaims, getCurrentUser } from "src/auth"
import * as express from "express"

export enum PermissionGrantResult {
  undefined = 0,
  Granted = 1,
  Prohibited = -1
}

export class PermissionCheckContext {
  name: string
  request?: express.Request

  constructor(name: string, request?: express.Request) {
    this.name = name
    this.request = request
  }

  get currentUser(): CurrentUser {
    return getCurrentUser(this.request)
  }
}

export interface IPermissionCheckProvider {
  name: string
  check(context: PermissionCheckContext): Promise<PermissionGrantResult>
}


export class AllowAllPermissionCheckProvider implements IPermissionCheckProvider {
  name: string = "all"
  check(context: PermissionCheckContext): Promise<PermissionGrantResult> {
    return Promise.resolve(PermissionGrantResult.Granted)
  }
}