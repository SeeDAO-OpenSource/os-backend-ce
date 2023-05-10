import { BitSubAccount, CoinType } from "dotbit";
import dotbit from "./dotbit.instance";
import { DotbitService } from "./dotbit.service";
import {  VerifyMintResult } from "./dotbit.dto";
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import {ISubDIDVerifier, VerifyMintContext} from "./dotbit.interface";

export class CdkeyVerifier implements ISubDIDVerifier {
    name = "cdkey"
    constructor(@Inject(forwardRef(() => DotbitService)) private dotbitService: DotbitService) {} 

    async verify(ctx: VerifyMintContext): Promise<void> {
      const key = ctx.cdkey
      if (!key) {
        return
      }
      const cdkey = await this.dotbitService.getCdkey(key)
      const result: VerifyMintResult = {
        verifierName: this.name,
        success: false,
        message: `cdkey ${key} is not valid`,
      }
      if (cdkey) {
        result.success = true
        result.data = cdkey
        result.message = undefined
      }
      ctx.results.push(result)
    }
  
    async postMint(address: string, subDID: string, res: VerifyMintResult): Promise<void> {
      if (res.data?.key) {
        await this.dotbitService.consumeKey(res.data.key, address, subDID)
      }
    }
  
  }
