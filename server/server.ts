import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import expressPino from 'express-pino-logger'
import pino from 'pino'
import apiRoute from './api'

require('./db')

/**
 * Function to create create Express server
 */
async function create() {
  // server
  const app = express()

  // Middleware
  app.use(bodyParser.json({limit: '10mb'}))

  app.use(cors())

  // Logger
  const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
  const expressLogger = expressPino({ logger })
  app.use(expressLogger)


  app.use('/api', apiRoute)

  // root route - serve static file
  app.use(express.static(path.join(__dirname, '../public/')))

  app.get(/.*/, function (req: any, res: any) {
    return res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  // Error handler
  // app.use((err: any, req: any, res: any) => {
  //   console.error(err.stack)
  //   res.status(500).send('Something broke!')
  // })
  return app
}

export default {
  create,
}
