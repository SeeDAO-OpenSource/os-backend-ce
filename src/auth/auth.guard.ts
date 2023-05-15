import { ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_AUTH_KEY } from "./constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  @Inject()
  private reflector: Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        const isAuth = this.reflector.getAllAndOverride<boolean>(IS_AUTH_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isAuth) {
          throw e
        }
      } else {
        throw e
      }
    }
    return true
  }
}