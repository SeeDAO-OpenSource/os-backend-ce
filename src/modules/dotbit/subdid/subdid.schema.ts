import { IsNotEmpty } from "class-validator";

export class VerifyMintParam {
  @IsNotEmpty()
  address: string;
  [key: string]: any;
}

export class VerifyMintResult {
  success: boolean;
  verifierName: string;
  message?: string;
  data?: { [key: string]: any };
}


export class MitSubDIDParam {
  /**
   * 钱包地址
   */
  @IsNotEmpty()
  address: string;
  /**
   *  subDID 的名称 ，比如：'test'，不包含 seedao.bit
   */
  @IsNotEmpty()
  subDID: string;
};


export class MintSubDIDInput extends MitSubDIDParam {
  /**
   *  包含了 subDID 的签名
   */
  signature: string;
  [key: string]: any;
};


export class MintSubDIDResult {
  success: boolean;
  message?: string;
  hash?: string;
}
