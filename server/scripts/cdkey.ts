import { getCdkey, insertKeys } from "../api/routers/dotbit/dotbit.cdkey"


export async function generateSubDIDCdkeys(num: number) {
  const cdkeys: string[] = []
  for (let i = 0; ; i++) {
    const cdkey = generateKey()
    const cd = await getCdkey(cdkey)
    if (!cd) {
      cdkeys.push(cdkey)
    }
    if (cdkeys.length >= num) {
      break
    }
  }
  await insertKeys(Array.from(cdkeys))
}

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function generateKey(): string {
  let key = ''
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * chars.length)
    key += chars[index]
  }
  return key
}
