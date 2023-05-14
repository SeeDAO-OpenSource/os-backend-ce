
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid'
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class WalletService {
  private logger = new Logger("WalletService")

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  createSignMessageNonce(address: string): Promise<string> {
    const nonce = uuidv4()
    this.cacheManager.set(address, nonce, 60 * 10 * 1000);
    return Promise.resolve(nonce)
  }

  consumeSignMessageNonce(address: string): Promise<string> {
    const nonce = this.cacheManager.get<string>(address)
    this.cacheManager.del(address)
    if (nonce) {
      return Promise.resolve(nonce)
    } else {
      return Promise.reject(new Error('No nonce'))
    }
  }

  verifySignMessage(address: string, msg: string, signature: string): boolean {
    try {
      const recoveredAddress = ethers.utils.verifyMessage(msg, signature)
      return ethers.utils.getAddress(address) === ethers.utils.getAddress(recoveredAddress)
    }
    catch (e: any) {
      this.logger.warn(e)
      return false
    }
  }


  getDefaultSignMessage(address: string, signNonce: string, action?: string): string {
    const appUrl = 'https://app.seedao.xyz'
    const appName = 'SeeDAO OS'
    let msg = `${appName} wants you to sign in\n with your Ethereum account:\n` +
      `${address}\n\n` +
      `Sign in with Ethereum to the ${appName}.\n\n` +
      `URI: ${appUrl}\n`
    if (action) {
      msg += `Action: ${action}\n`
    }
    msg += `Version: 1\nNonce: ${signNonce}\n`
    return msg
  }

  async verifyDefaultSignMessage(address: string, signature: string, action?: string): Promise<boolean> {
    const nonce = await this.consumeSignMessageNonce(address)
    const msg = this.getDefaultSignMessage(address, nonce, action)
    return this.verifySignMessage(address, msg, signature)
  }
}