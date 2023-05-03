import { DotbitService, VerifyMintParam } from "./dotbit.service";
import express from "express";

export type MitSubDIDParam = {
  // 钱包地址
  address: string,
  // subDID 的名称 ，比如：'test'，不包含 seedao.bit
  subDID: string,
}

export type MintSubDIDInput = MitSubDIDParam & {
  // 包含了 subDID 的签名
  signature: string,
  [key: string]: any
}

export class DotbitController {
  service: DotbitService;

  constructor(service: DotbitService) {
    this.service = service;
  }

  /**
   * 验证当前钱包地址是否具备创建子DID的资格
   * @param req 
   * @param res 
   * @returns 
   */
  async verifyCanMintSubDID(req: express.Request<any, any, any, VerifyMintParam>, res: express.Response) {
    try {
      const input = req.query;
      if (input.address === undefined) {
        res.status(400).json({ message: 'address is required' });
        return;
      }
      const result = await this.service.verifyMintSubDID(input);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ message: err.message, isErr: true });
    }
  }

  /**
   * 创建子DID签名消息
   * @param req 
   * @param res 
   * @returns 
   */
  async createMintSubDiDSignMessage(req: express.Request<any, any, MitSubDIDParam>, res: express.Response) {
    try {
      const input = req.body;
      if (!input.address) {
        res.status(400).json({ message: 'address is required' });
        return;
      }
      if (!input.subDID) {
        res.status(400).json({ message: 'subDID is required' });
        return;
      }
      const result = await this.service.createMintSubDiDSignMessage(input.address, input.subDID);
      res.json({ signMessage: result });
    } catch (err: any) {
      res.status(500).json({ message: err.message, isErr: true });
    }
  }

  /**
   * 创建子DID
   * @param req 
   * @param res 
   */
  async mintSubDID(req: express.Request<any, any, MintSubDIDInput>, res: express.Response) {
    try {
      const input = req.body;
      const result = await this.service.mintSubDID(input);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ message: err.message, isErr: true });
    }
  }

  /**
   * 检查子DID是否可以被创建
   * @param req 
   * @param res 
   */
  async checkSubDID(req: express.Request, res: express.Response) {
    try {
      const subDID = req.query.subDID as string
      if (subDID === undefined) {
        res.status(400).json({ message: 'subDID is required' });
        return;
      }
      const address = req.query.address as string
      if (address === undefined) {
        res.status(400).json({ message: 'address is required' });
        return;
      }
      const result = await this.service.checkSubDID(subDID, address)
      res.json(result)
    } catch (err: any) {
      res.status(500).json({ message: err.message, isErr: true });
    }
  }
}