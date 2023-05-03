import express from 'express'
import { DotbitController } from './dotbit.controller';

export const createDotbitRouter = (controller: DotbitController) => {
  const router = express.Router();

  router.route('/subdid/can-mint').get(
    (req: any, res) => controller.verifyCanMintSubDID(req, res));
  router.route('/subdid/check-valid').get((req, res) => controller.checkSubDID(req, res));
  router.route('/subdid/mint-sign-msg').post((req, res) => controller.createMintSubDiDSignMessage(req, res));
  router.route('/subdid/mint').post((req, res) => controller.mintSubDID(req, res));
  return router;
}

