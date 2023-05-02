import { BitSubAccount, CoinType } from "dotbit";
import flureedb from "../../../config/flureedb";
import dotbit from "./dotbit.instance";
import { ISubDIDVerifier, VerifyMintContext, VerifyMintResult, seedaoBit } from "./dotbit.service";


export class AdressVerifier implements ISubDIDVerifier {
  name = "address"

  async verify(ctx: VerifyMintContext): Promise<void> {
    const accounts = await dotbit.accountsOfOwner({
      key: ctx.address,
      coin_type: CoinType.ETH,
    })
    for (const account of accounts) {
      if (account instanceof BitSubAccount && account.mainAccount == seedaoBit) {
        ctx.results = [
          {
            verifierName: this.name,
            success: false,
            message: `already minted subDID ${account.account}`,
            data: {
              subDID: account.account
            }
          }
        ]
        ctx.isHandled = true
      }
    }
  }
  postMint(address: string, subDID: string, res: VerifyMintResult): Promise<void> {
    return Promise.resolve();
  }
}

export default new AdressVerifier()