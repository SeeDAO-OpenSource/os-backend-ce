import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionService } from "./permission.service";
import { Request } from "express";

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...roles: string[]) => SetMetadata(PERMISSIONS_KEY, roles);

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private permissionService: PermissionService) {

  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>()
    for (const p of requiredPermissions) {
      const isGranted = await this.permissionService.isGranted(p, req)
      if (!isGranted) {
        throw new UnauthorizedException()
      }
    }
    return true;
  }
}