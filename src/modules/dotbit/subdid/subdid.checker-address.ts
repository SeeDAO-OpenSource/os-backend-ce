import { BitSubAccount, CoinType } from "dotbit";
import dotbit from "../common/dotbit.instance";
import { ISubDIDVerifier, VerifyMintContext } from "./subdid.interface";
import { PrismaService } from "src/prisma";
import { VerifyMintResult } from "./subdid.schema";
import { ConfigService } from "@nestjs/config";

export class AddressVerifier implements ISubDIDVerifier {
  name = "address"
  constructor(private prisma: PrismaService, private configService: ConfigService) { }

  async verify(ctx: VerifyMintContext): Promise<void> {
    const record = await this.prisma.subDIDMintRecord.findFirst({
      where: {
        address: ctx.address,
      }
    });
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
    const seedaoBit = this.configService.get<string>('SEEDAO_BIT');
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

