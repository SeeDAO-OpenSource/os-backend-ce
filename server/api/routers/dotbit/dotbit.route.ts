import express from 'express'
import { DotbitController } from './dotbit.controller';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 30, // Limit each IP to 30 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export const createDotbitRouter = (controller: DotbitController) => {
  const router = express.Router();

  router.route('/subdid/can-mint').get(
    (req: any, res) => controller.verifyCanMintSubDID(req, res));
  router.route('/subdid/check-valid').get((req, res) => controller.checkSubDID(req, res));
  router.route('/subdid/mint-sign-msg').post((req, res) => controller.createMintSubDiDSignMessage(req, res));
  router.route('/subdid/mint').post(limiter, (req, res) => controller.mintSubDID(req, res));
  // router.route('/subdid/mint').get(limiter, (req, res) => res.json({ message: 'ok' }));
  return router;
}

