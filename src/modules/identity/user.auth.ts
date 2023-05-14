import { JwtUserClaims } from "src/auth/auth.dto";
import { UserManager } from "src/auth/auth.user";
import { UserService } from "./user.service";
import { Injectable } from "@nestjs/common";
import { IdGenerator } from "src/common";

@Injectable()
export class IdentityUserManager extends UserManager {

  constructor(private userService: UserService, private idGenerator: IdGenerator) {
    super();
  }

  async findByWallet(wallet: string): Promise<JwtUserClaims | null> {
    let user = await this.userService.findUserByWallet(wallet);
    if (!user) {
      user = await this.userService.createUser({
        id: this.idGenerator.create(),
        wallet,
        nickname: wallet,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: null,
        bio: null,
      })
    }
    return {
      sub: user.id,
      wallet: user.wallet,
      nickname: user.nickname,
    }
  }
}