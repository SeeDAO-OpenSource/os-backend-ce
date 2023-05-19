import { PrismaService } from "src/prisma";
import { ISubDIDVerifier, VerifyMintContext } from "./subdid.interface";
import { VerifyMintResult } from "./subdid.schema";

export class CdkeyVerifier implements ISubDIDVerifier {
  name = "cdkey"

  constructor(private prisma: PrismaService) { }

  async verify(ctx: VerifyMintContext): Promise<void> {
    const key = ctx.cdkey
    if (!key) {
      return
    }
    const cdkey = await this.prisma.subDIDCdKey.findFirst({
      where: {
        key: key,
        isValid: true,
      }
    })
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
      await this.prisma.subDIDCdKey.update({
        where: {
          key: res.data.key
        },
        data: {
          isValid: false,
          subDID: subDID,
          address: address,
          updatedAt: new Date(),
        }
      })
    }
  }

}
