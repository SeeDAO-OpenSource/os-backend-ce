// import { ERC721, ERC721Contract } from "../../ether";
// import { ISubDIDVerifier, VerifyMintContext, VerifyMintResult } from "./dotbit.service";
// import { ethers } from "ethers";
// import { insertSgnMintRecord, sgnHasMinted } from "./dotbit.sgn.repo";

// export const SGNContractAddress = "0x23fDA8a873e9E46Dbe51c78754dddccFbC41CFE1"

// /**
//  * SGN Owner 验证器
//  */
// export const VERIFIER_SGNOWNER = 'sgn-owner'

// class SGNSubDIDVerifier implements ISubDIDVerifier {
//   private sgnContract: ERC721Contract

//   constructor() {
//     this.sgnContract = ERC721(SGNContractAddress)
//   }
//   name: string = VERIFIER_SGNOWNER

//   /**
//    * 验证当前钱包地址是否具备创建子DID的资格
//    * @param address 
//    * @returns 
//    */
//   async verify(ctx: VerifyMintContext): Promise<void> {
//     const addr = ethers.utils.getAddress(ctx.address)
//     const tokens = await this.sgnContract.tokensOfOwner(addr)
//     const result: VerifyMintResult = {
//       success: false,
//       verifierName: VERIFIER_SGNOWNER,
//       message: 'No SGN token'
//     }
//     const tokenResults: any[] = []
//     for (const tokenId of tokens) {
//       let hasMinted = true
//       hasMinted = await sgnHasMinted(tokenId)
//       tokenResults.push({ tokenId: tokenId.toString(), hasMinted })
//       if (!hasMinted) {
//         result.success = true
//         result.message = ''
//         break
//       }
//     }
//     if (!result.success && tokens.length > 0) {
//       result.message = 'All SGN tokens have been minted'
//     }
//     result.data = tokenResults
//     ctx.results.push(result)
//   }

//   async postMint(address: string, subDID: string, res: VerifyMintResult): Promise<void> {
//     const token = res.data?.find((item: any) => !item.hasMinted)
//     if (token) {
//       await insertSgnMintRecord({
//         address,
//         subDID,
//         timestamp: Date.now(),
//         tokenId: token.tokenId,
//         contract: SGNContractAddress
//       })
//     }
//     return Promise.resolve()
//   }

// }

// export default new SGNSubDIDVerifier()

