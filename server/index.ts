import dotenv from 'dotenv'
dotenv.config();

import logger from './config/pino'
import server from './server'
import { generateSubDIDCdkeys } from './scripts/cdkey';

if (process.argv[2] == "gen-cdkey") {
  generateSubDIDCdkeys(10).then(() => {
    logger.info("done")
  })
} else {
  const port = process.env.PORT || 3000
  server
    .create()
    .then((app) => {
      app.listen(port, () => {
        logger.info(`Server has started on http://localhost:${port} !`)
      })
    })
    .catch((err) => logger.error(err))

}

