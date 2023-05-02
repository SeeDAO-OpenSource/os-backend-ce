
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid'
import { LRUCache } from 'lru-cache'

const signNonceCache = new LRUCache<string, string>({
  ttl: 10 * 60 * 1000, ttlAutopurge: false,
  max: 1000000
});

export function createSignMessageNonce(address: string): Promise<string> {
  const nonce = uuidv4()
  signNonceCache.set(address, nonce);
  return Promise.resolve(nonce)
}

export function consumeSignMessageNonce(address: string): Promise<string> {
  const nonce = signNonceCache.get(address)
  signNonceCache.delete(address)
  if (nonce) {
    return Promise.resolve(nonce)
  } else {
    return Promise.reject(new Error('No nonce'))
  }
}

export function verifySignMessage(address: string, msg: string, signature: string): boolean {
  const recoveredAddress = ethers.utils.verifyMessage(msg, signature)
  return ethers.utils.getAddress(address) === ethers.utils.getAddress(recoveredAddress)
}

export function getDefaultSignMessage(address: string, signNonce: string, action?: string): string {
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

export async function verifyDefaultSignMessage(address: string, signature: string, action?: string): Promise<boolean> {
  const nonce = await consumeSignMessageNonce(address)
  const msg = getDefaultSignMessage(address, nonce, action)
  return verifySignMessage(address, msg, signature)
}