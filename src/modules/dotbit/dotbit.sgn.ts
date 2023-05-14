import { ERC721, ERC721Contract } from "../../wallet";
import { DotbitService } from "./dotbit.service";
import { VerifyMintResult } from './dotbit.dto'
import { ethers } from "ethers";
import { SGNContractAddress , VERIFIER_SGNOWNER } from "./dobit.constant"
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import {ISubDIDVerifier, VerifyMintContext} from "./dotbit.interface";

/**
 * SGN Owner 验证器
 */

export class SGNSubDIDVerifier implements ISubDIDVerifier {
  private sgnContract: ERC721Contract
  constructor(
     @Inject(forwardRef(() => DotbitService)
  ) private dotbitService: DotbitService) {
    this.sgnContract = ERC721(SGNContractAddress)

} 

  name: string = VERIFIER_SGNOWNER

  /**
   * 验证当前钱包地址是否具备创建子DID的资格
   * @param address 
   * @returns 
   */
  async verify(ctx: VerifyMintContext): Promise<void> {
    const addr = ethers.utils.getAddress(ctx.address)
    const tokens = await this.sgnContract.tokensOfOwner(addr)
    const result: VerifyMintResult = {
      success: false,
      verifierName: VERIFIER_SGNOWNER,
      message: 'No SGN token'
    }
    const tokenResults: any[] = []
    for (const tokenId of tokens) {
      let hasMinted = true
      hasMinted = await this.dotbitService.sgnHasMinted(tokenId)
      tokenResults.push({ tokenId: tokenId.toString(), hasMinted })
      if (!hasMinted) {
        result.success = true
        result.message = ''
        break
      }
    }
    if (!result.success && tokens.length > 0) {
      result.message = 'All SGN tokens have been minted'
    }
    result.data = tokenResults
    ctx.results.push(result)
  }

  async postMint(address: string, subDID: string, res: VerifyMintResult): Promise<void> {
    const token = res.data?.find((item: any) => !item.hasMinted)
    if (token) {
      await this.dotbitService.insertSgnMintRecord({
        address,
        subDID,
        tokenId:  parseInt(token.tokenId, 10),
        contract: SGNContractAddress
      })
    }
    return Promise.resolve()
  }

}


