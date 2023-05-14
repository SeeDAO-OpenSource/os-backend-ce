import { BitNetwork, EthersSigner, createInstance } from 'dotbit'
import { Wallet } from 'ethers';
import ether from '../../wallet';

const privateKey = process.env.DOTBIT_SEEDAO_PRIVATE_KEY;
if (privateKey === undefined) {
  throw new Error('DOTBIT_SEEDAO_PRIVATE_KEY is required')
}
const wallet = new Wallet(privateKey, ether.provider)
const signer = new EthersSigner(wallet)
const dotbit = createInstance({ signer, network: BitNetwork.mainnet })

export default dotbit