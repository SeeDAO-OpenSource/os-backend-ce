import { ethers } from "ethers"
import { ERC721Contract } from "./ERC721"

const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL)

/**
 * 创建 ERC721 合约实例
 * @param contract 合约地址
 * @returns ERC721 合约实例
 */
export function ERC721(contract: string) {
  return new ERC721Contract(contract, provider)
}

export * from './ERC721'
export default {
  provider
}