import { JwtUserClaims } from "src/auth"
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
}

export interface IPermissionCheckProvider {
  name: string
  check(context: PermissionCheckContext): Promise<PermissionGrantResult>
  setGrants(name: string[], providerKey: string, isGranted: boolean): Promise<void>

}