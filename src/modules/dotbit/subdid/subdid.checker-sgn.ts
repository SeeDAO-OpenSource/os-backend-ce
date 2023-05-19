import { ethers } from "ethers";
import { ISubDIDVerifier, VerifyMintContext } from "./subdid.interface";
import { PrismaService } from "src/prisma";
import { VerifyMintResult } from "./subdid.schema";
import { ERC721, ERC721Contract } from "src/wallet";
import { SGNContractAddress, VERIFIER_SGNOWNER } from "../common/dotbit.constant";

/**
 * SGN Owner 验证器
 */

export class SGNSubDIDVerifier implements ISubDIDVerifier {
  private sgnContract: ERC721Contract
  constructor(private prisma: PrismaService) {
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
      const record = await this.prisma.sGNMintRecord.findUnique({
        where: {
          tokenId_contract: {
            tokenId: tokenId.toString(),
            contract: SGNContractAddress
          }
        }
      })
      hasMinted = !!record
      tokenResults.push({ tokenId: tokenId.toString(), hasMinted: hasMinted })
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
      await this.prisma.sGNMintRecord.create({
        data: {
          tokenId: token.tokenId.toString(),
          address,
          subDID,
          contract: SGNContractAddress
        }
      })
    }
  }
}


