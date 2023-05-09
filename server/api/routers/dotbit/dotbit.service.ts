import { Wallet, ethers } from "ethers"
import { MintSubDIDInput } from "./dotbit.controller"
import { CheckSubAccountStatus, CoinType, DotBit, EthersSigner, SubAccountMintParams, SubAccountParams, createInstance, graphemesAccount } from 'dotbit'
import { createSignMessageNonce, getDefaultSignMessage, verifyDefaultSignMessage } from "../../../ether/wallet"
import dotbit from "./dotbit.instance"
import { insertRecord } from "./dotbit.repo"


export type VerifyMintParam = {
  address: string,
  [key: string]: any
}

export type VerifyMintResult = {
  success: boolean,
  verifierName: string,
  message?: string,
  data?: { [key: string]: any },
}

export interface VerifyMintContext {
  address: string,
  subDID?: string,
  isHandled: boolean,
  results: VerifyMintResult[]
  [key: string]: any
}

export type MintSubDIDResult = {
  hash?: string,
  success: boolean,
  message?: string,
}

/**
 * subDID可用性验证器
 */
const VERIFIER_SUBDID_CHECK = 'subdid-check'

export interface ISubDIDVerifier {
  name: string
  verify(ctx: VerifyMintContext): Promise<void>
  postMint(address: string, subDID: string, res: VerifyMintResult): Promise<void>
}
export const seedaoBit = "seedaotest.bit"

export class DotbitService {
  private verifiers: ISubDIDVerifier[] = []

  /**
   * 添加钱包地址 SubDID 验证器
   * @param verifier 钱包地址 SubDID 验证器
   */
  addVerifier(verifier: ISubDIDVerifier) {
    this.verifiers.push(verifier)
  }

  /**
   * 验证当前钱包地址是否具备创建子DID的资格
   * @param address 钱包地址
   * @returns 
   */
  async verifyMintSubDID(param: VerifyMintParam): Promise<VerifyMintResult[]> {
    param.address = ethers.utils.getAddress(param.address)
    const ctx = { ...param, isHandled: false, results: [] }
    for (const verifier of this.verifiers) {
      await verifier.verify(ctx)
      if (ctx.isHandled) {
        break
      }
    }
    return ctx.results
  }

  /**
   * 检查子DID是否可以被创建
   * @param subDID 
   * @param address 
   * @returns 
   */
  async checkSubDID(subDID: string, address: string): Promise<VerifyMintResult> {
    address = ethers.utils.getAddress(address)
    const account = dotbit.account(seedaoBit)

    const subAccounts: SubAccountMintParams[] = [{
      account: subDID + "." + seedaoBit,
      type: 'blockchain',
      key_info: {
        key: address,
        coin_type: CoinType.ETH,
      },
      register_years: 1,
      account_char_str: graphemesAccount(subDID)
    }]

    const checkResult = await account.checkSubAccounts(subAccounts)
    const res = checkResult.result[0]
    const result: VerifyMintResult = { success: false, message: '', verifierName: VERIFIER_SUBDID_CHECK }
    if (res.status === CheckSubAccountStatus.ok) {
      result.success = true
    } else {
      result.message = res.message
    }
    return result
  }

  /**
   * 创建subDID签名消息
   * @param address 
   * @param subDID 
   * @returns 
   */
  async createMintSubDiDSignMessage(address: string, subDID: string): Promise<string> {
    address = ethers.utils.getAddress(address)
    const action = this.getSignAction(subDID)
    const nonce = await createSignMessageNonce(address)
    return getDefaultSignMessage(address, nonce, action)
  }

  /**
   * 创建子DID
   * @param input 
   * @returns 
   */
  async mintSubDID(input: MintSubDIDInput): Promise<MintSubDIDResult> {
    const address = ethers.utils.getAddress(input.address)
    input.address = address
    const action = this.getSignAction(input.subDID)
    const signed = await verifyDefaultSignMessage(address, input.signature, action)
    if (!signed) {
      return { success: false, message: "signature is invalid" }
    }
    const result = await this.verifyMintSubDID(input)
    const canMint = result.find(r => r.success)
    if (!canMint) {
      throw new Error("has no permission to mint subDID")
    }
    const account = dotbit.account(seedaoBit)
    const subAccountStr = input.subDID + "." + seedaoBit
    const subAccounts: SubAccountParams = {
      account: subAccountStr,
      keyInfo: {
        key: address,
        coin_type: CoinType.ETH,
      },
      registerYears: 1,
    }
    const checkResult = await account.mintSubAccount(subAccounts)
    const verifier = this.verifiers.find(v => v.name === canMint.verifierName)
    if (verifier) {
      await verifier.postMint(address, subAccountStr, canMint)
    }
    await insertRecord({
      address: address,
      subDID: subAccountStr,
      timestamp: Date.now(),
      verifier: canMint.verifierName,
    })
    return { success: true, hash: checkResult.hash_list[0] }
  }

  private getSignAction(subDid: string) {
    return "Mint SubDID: " + subDid + ".seedao.bit"
  }
}

const service = new DotbitService()
export default service