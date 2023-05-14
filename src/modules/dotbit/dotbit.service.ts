import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../prisma/service';
import { Wallet, ethers } from 'ethers';
import { VerifyMintParam, VerifyMintResult, MintSubDIDInput, MintSubDIDResult, SubDIDMintRecordCreateInput, } from './dotbit.dto';
import { InsertSGNMintRecordDto, } from './dotbit.dto';
import { ISubDIDVerifier, VerifyMintContext } from './dotbit.interface';

import { Prisma, SGNMintRecord, SubDIDCdKey } from '@prisma/client';

import { AddressVerifier } from './dotbit.address';
import { CdkeyVerifier } from './dotbit.cdkey';
import { SGNSubDIDVerifier } from './dotbit.sgn';

import { SGNContractAddress, chars, seedaoBit, VERIFIER_SUBDID_CHECK, VERIFIER_SGNOWNER } from './dobit.constant'

import {
  CheckSubAccountStatus,
  CoinType,
  SubAccountMintParams,
  SubAccountParams,
  graphemesAccount,
} from 'dotbit';
import { WalletService } from '../../wallet/wallet.service';
import dotbit from './dotbit.instance';

@Injectable()
export class DotbitService {
  private verifiers: ISubDIDVerifier[] = [];

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AddressVerifier))  // 注入 AddressVerifier解决循环依赖
    addressVerifier: AddressVerifier,  // 注入 AddressVerifier
    @Inject(forwardRef(() => CdkeyVerifier))
    cdkeyVerifier: CdkeyVerifier,
    @Inject(forwardRef(() => SGNSubDIDVerifier))
    sGNSubDIDVerifier: SGNSubDIDVerifier,
    private walletService: WalletService,
  ) {
    // 添加 AddressVerifier 到 verifiers 数组
    this.addVerifier(addressVerifier);
    this.addVerifier(cdkeyVerifier);
    this.addVerifier(sGNSubDIDVerifier);

  }

  // 添加 addVerifier 方法
  addVerifier(verifier: ISubDIDVerifier) {
    this.verifiers.push(verifier);
  }

  /**
 * 验证当前钱包地址是否具备创建子DID的资格
 * @param address 钱包地址
 * @returns 
 */
  getVerifiers(): ISubDIDVerifier[] {
    return this.verifiers;
  }

  async verifyMintSubDID(address: string, cdkey: string): Promise<VerifyMintResult[]> {
    const ctx = { address, cdkey, isHandled: false, results: [] };
    for (const verifier of this.verifiers) {
      await verifier.verify(ctx)
      if (ctx.isHandled) {
        break
      }
    }
    return ctx.results
  }

  private getSignAction(subDid: string) {
    return "Mint SubDID: " + subDid + ".seedao.bit"
  }

  async getSubDIDMintRecord(address: string) {
    console.log('Searching for address:', address);
    const record = await this.prisma.subDIDMintRecord.findFirst({
      where: {
        address: address,
      },
    });
    console.log('Found record:', record);
    return record;
  }



  /**
   * 检查子DID是否可以被创建
   * @param subDID 
   * @param address 
   * @returns 
   */
  async checkSubDID(address: string, subDID: string): Promise<VerifyMintResult> {
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
   * 创建子DID签名消息
   * @param req 
   * @param res 
   * @returns 
   */
  async createMintSignMsg(address: string, subDID: string): Promise<{ signMessage: string }> {
    address = ethers.utils.getAddress(address)
    const action = this.getSignAction(subDID)
    const nonce = await this.walletService.createSignMessageNonce(address)
    const result = this.walletService.getDefaultSignMessage(address, nonce, action)

    return { signMessage: result }
  }

  /**
  * 创建子DID
  * @param input 
  * @returns 
  */
  async insertSubDIDMintRecord(input: MintSubDIDInput): Promise<MintSubDIDResult> {

    const address = ethers.utils.getAddress(input.address)
    input.address = address
    if (input.cdkey) {
      input.cdkey = input.cdkey.trim()
    }
    const action = this.getSignAction(input.subDID)
    const signed = await this.walletService.verifyDefaultSignMessage(address, input.signature, action)
    if (!signed) {
      return { success: false, message: "signature is invalid" }
    }
    const result = await this.verifyMintSubDID(input.address, input.cdkey)
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


    await this.prisma.subDIDMintRecord.create({
      data: {
        address: address,
        subDID: subAccountStr,
        verifier: canMint.verifierName,
      },
    });

    return { success: true, hash: checkResult.hash_list[0] }
  }



  // CDKEY 相关
  async getCdkey(key: string, all = false): Promise<SubDIDCdKey | undefined> {
    return this.prisma.subDIDCdKey.findFirst({
      where: {
        key: key,
        isValid: !all,
      },
    });
  }

  async consumeKey(cdkey: string, address: string, subDID: string): Promise<void> {
    await this.prisma.subDIDCdKey.update({
      where: { key: cdkey },
      data: { isValid: false, address: address, subDID: subDID },
    });
  }


  async generateSubDIDCdkeys(num: number): Promise<void> {
    const cdkeys = new Set<string>();
    for (let i = 0; i < num;) {
      const cdkey = this.generateKey()
      const cd = await this.getCdkey(cdkey)
      if (!cd && !cdkeys.has(cdkey)) {
        cdkeys.add(cdkey)
        i++
      }
    }
    console.log('Generated cdkeys:', cdkeys);
    await this.insertKeys(Array.from(cdkeys));
  }

  private generateKey(): string {
    let key = ''
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * chars.length)
      key += chars[index]
    }
    console.log('Generated key:', key);
    return key
  }

  private generateKeys(num: number): string[] {
    const keys: string[] = [];

    for (let i = 0; i < num; i++) {
      let key = '';
      for (let j = 0; j < 6; j++) {
        const index = Math.floor(Math.random() * chars.length);
        key += chars[index];
      }
      keys.push(key);
    }
    console.log('Generated keys:', keys);
    return keys;
  }

  private async getExistingCdkeys(keys: string[]): Promise<Set<string>> {
    const existingKeys = new Set<string>();

    const cdkeys = await this.prisma.subDIDCdKey.findMany({
      where: {
        key: {
          in: keys,
        },
      },
    });

    for (const cdkey of cdkeys) {
      existingKeys.add(cdkey.key);
    }

    return existingKeys;
  }

  private async insertKeys(keys: string[]): Promise<void> {
    const cdkeyRecords = keys.map((key) => ({
      key,
      isValid: true,
    }));
    await this.prisma.subDIDCdKey.createMany({
      data: cdkeyRecords,
    });
  }

  // SGN 相关
  async querySgnMintRecord(tokenId: bigint): Promise<SGNMintRecord | null> {
    return await this.prisma.sGNMintRecord.findUnique({
      where: {
        tokenId: Number(tokenId),
      },
    });
  }

  async sgnHasMinted(tokenId: bigint): Promise<boolean> {
    const prismaResult = await this.prisma.sGNMintRecord.findUnique({
      where: {
        tokenId: Number(tokenId),
      },
    });

    return !!prismaResult;
  }

  async insertSgnMintRecord(record: InsertSGNMintRecordDto): Promise<SGNMintRecord> {
    const sgnMintRecord: Prisma.SGNMintRecordCreateInput = {
      address: record.address,
      tokenId: record.tokenId,
      subDID: record.subDID,
      contract: SGNContractAddress,
    };

    return this.prisma.sGNMintRecord.create({
      data: sgnMintRecord,
    });
  }



}