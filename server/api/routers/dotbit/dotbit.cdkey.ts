/**
 * 通过Code来领取 subDID
 */

import flureedb from "../../../config/flureedb";
import { ISubDIDVerifier, VerifyMintContext, VerifyMintResult } from "./dotbit.service";

export class CdkeyVerifier implements ISubDIDVerifier {
  name = "cdkey"

  async verify(ctx: VerifyMintContext): Promise<void> {
    const key = ctx.cdkey
    if (!key) {
      return
    }
    const cdkey = await getCdkey(key)
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
      await consumeKey(res.data.key, address, subDID)
    }
  }

}

//#region repo

const CdkeyCollectionName = 'subdid_cdkeys'

export interface subDIDCdkey {
  key: string,
  isValid: boolean,
  address?: string,
  subDID?: string
}

export async function getCdkey(key: string, all = false): Promise<subDIDCdkey | undefined> {
  const query = {
    select: ['key'],
    from: CdkeyCollectionName,
    where: `key = "${key}"${all ? '' : ' AND isValid = true'}`,
  }
  const response = await flureedb.query(query)
  const result = await response.json()
  if (result.length === 0) {
    return undefined
  }
  return result[0]
}

export async function insertKeys(cdkeys: string[]) {
  const creator = cdkeys.map(k => {
    return {
      _id: CdkeyCollectionName,
      key: k,
      isValid: true,
    }
  })
  const response = await flureedb.transact(creator)
  const result = await response.json();
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`insertMany failed: ${result.message}`)
  }
}

export async function consumeKey(cdkey: string, address: string, subDID: string) {
  const updator = [
    {
      _id: [
        CdkeyCollectionName + "/key",  // predicate
        cdkey // value
      ],
      isValid: false,
      address,
      subDID,
    }
  ]
  const response = await flureedb.transact(updator)
  const result = await response.json();
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`consume CDKEY failed: ${result.message}`)
  }
}


//#endregion