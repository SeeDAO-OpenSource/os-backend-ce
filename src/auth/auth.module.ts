import { DynamicModule, Global, Module, Type } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { UserManager } from "./auth.user";
import { AuthController } from "./auth.controller";

export interface IAuthModuleOptions {
  userManager?: Type<UserManager>;
}

@Global()
@Module({})
export class AuthModule {
  static register(opts?: IAuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
      ],
      controllers: [AuthController],
      providers: [
        JwtStrategy,
        AuthService,
        UserManager,
        {
          provide: UserManager,
          useClass: opts?.userManager || UserManager,
        }],
      exports: [AuthService, UserManager],
    };
  }
}