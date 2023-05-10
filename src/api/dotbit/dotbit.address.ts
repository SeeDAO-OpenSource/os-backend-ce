import { BitSubAccount, CoinType } from "dotbit";
import dotbit from "./dotbit.instance";
import { DotbitService } from "./dotbit.service";
import {  VerifyMintResult } from "./dotbit.dto";
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { seedaoBit } from "./dobit.constant";
import {ISubDIDVerifier, VerifyMintContext} from "./dotbit.interface";

export class AddressVerifier implements ISubDIDVerifier {
  name = "address"
  constructor(@Inject(forwardRef(() => DotbitService)) private dotbitService: DotbitService) {} 

  async verify(ctx: VerifyMintContext): Promise<void> {
    const record =  await this.dotbitService.getSubDIDMintRecord(ctx.address);
    if (record) { // 该地址已经mint过
       this.setAddressMinted(ctx, record.subDID)
    } else { // 该地址未mint过, 检查是否有subDID
    //   await this.checkBydotbit(ctx);
       console.log(' AddressVerifier Searching for address:', ctx.address);
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
