import { BitSubAccount, CoinType } from "dotbit";
import flureedb from "../../../config/flureedb";
import dotbit from "./dotbit.instance";
import { ISubDIDVerifier, VerifyMintContext, VerifyMintResult, seedaoBit } from "./dotbit.service";
import { getMintRecords } from "./dotbit.repo";


export class AdressVerifier implements ISubDIDVerifier {
  name = "address"

  async verify(ctx: VerifyMintContext): Promise<void> {
    const record = await getMintRecords(ctx.address)
    if (record) { // 该地址已经mint过
      this.setAddressMinted(ctx, record.subDID)
    } else { // 该地址未mint过, 检查是否有subDID
      await this.checkBydotbit(ctx);
    }
  }

  postMint(address: string, subDID: string, res: VerifyMintResult): Promise<void> {
    return Promise.resolve();
  }

  /**
   * 检查是否有subDID
   * @param ctx 
   */
  async checkBydotbit(ctx: VerifyMintContext) {
    const accounts = await dotbit.accountsOfOwner({
      key: ctx.address,
      coin_type: CoinType.ETH,
    });
    for (const account of accounts) {
      if (account instanceof BitSubAccount && account.mainAccount == seedaoBit) {
        this.setAddressMinted(ctx, account.account)
      }
    }
  }

  /**
   * 设置已经mint过
   * @param ctx 
   * @param subDID 
   */
  private setAddressMinted(ctx: VerifyMintContext, subDID: string) {
    ctx.results = [
      {
        verifierName: this.name,
        success: false,
        message: `already minted subDID ${subDID}`,
        data: {
          subDID: subDID
        }
      }
    ];
    ctx.isHandled = true;
  }
}

export default new AdressVerifier()
