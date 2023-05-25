import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserManager } from './auth.user';
import { UserLoginInput, LoginResult } from './auth.dto';
import { WalletService } from 'src/wallet/wallet.service';
import { LOGIN_ACTION } from './constants';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserManager))
    protected readonly userManager: UserManager,
    protected readonly wallteService: WalletService,
  ) { }

  async login(param: UserLoginInput): Promise<LoginResult> {
    const result = this.wallteService.verifyDefaultSignMessage(param.wallet, param.signature, LOGIN_ACTION);
    if (!result) {
      return null;
    }
    const user = await this.userManager.findByWallet(param.wallet);
    if (!user) {
      return null;
    }
    return {
      id: user.sub,
      nickname: user.nickname,
      wallet: user.wallet,
      accessToken: this.jwtService.sign(user),
    };
  }

  async getLoginSignMessage(wallet: string): Promise<string> {
    wallet = ethers.utils.getAddress(wallet);
    const nonce = await this.wallteService.createSignMessageNonce(wallet);
    const msg = this.wallteService.getDefaultSignMessage(wallet, nonce, LOGIN_ACTION);
    return msg;
  }

  async getUserInfo(wallet: string) {
    return this.userManager.findByWallet(wallet);
  }
}