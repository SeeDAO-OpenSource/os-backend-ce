import { Request } from "express";
import { JwtUserClaims } from "./auth.dto";

export function getCurrentUser(request?: Request): CurrentUser {
  return new CurrentUser(request);
}

export class CurrentUser {
  constructor(private req?: Request) { }

  get authenticated(): boolean {
    const id = this.id
    return id && id !== '';
  }

  get id(): string {
    if (this.req?.user) {
      return (this.req.user as JwtUserClaims).sub;
    }
    return '';
  }

  get wallet(): string {
    if (this.req?.user) {
      return (this.req.user as JwtUserClaims).wallet;
    }
    return '';
  }

  get nickname(): string {
    if (this.req?.user) {
      return (this.req.user as JwtUserClaims).nickname;
    }
    return '';
  }

}

export class UserManager {

  findByWallet(wallet: string): Promise<JwtUserClaims | null> {
    return Promise.resolve(null);
  }
}