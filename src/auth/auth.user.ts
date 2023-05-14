import { JwtUserClaims } from "./auth.dto";

export class UserManager {

  findByWallet(wallet: string): Promise<JwtUserClaims | null> {
    return Promise.resolve(null);
  }
}