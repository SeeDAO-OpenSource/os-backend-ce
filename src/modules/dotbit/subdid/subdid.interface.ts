import { VerifyMintResult } from "./subdid.schema";

export interface SubDIDCdkey {
    id: number;
    key: string;
    isValid: boolean;
    address?: string;
    subDID?: string;
  }


  export interface ISubDIDVerifier {
    name: string
    verify(ctx: VerifyMintContext): Promise<void>
    postMint(address: string, subDID: string, res: VerifyMintResult): Promise<void>
  }

  
  export interface VerifyMintContext {
    address: string,
    subDID?: string,
    isHandled: boolean,
    results: VerifyMintResult[]
    [key: string]: any
  }