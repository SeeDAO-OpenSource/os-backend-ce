import debug from 'debug';

import mongoose from 'mongoose';
import logger from './pino';

const log = debug('app:config:mongodb');
log('mongoose loaded');

const mongoUrl: string = process.env.MONGO_URL as string;
const mongoOptions: object = { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true };

export default async function testDBConnection(): Promise<void> {

  mongoose.connect(mongoUrl, mongoOptions);
  const db = mongoose.connection;
  log('connect to mongoose ...');

  db.on('error', (err) => {
    logger.error('MongoDB error: ', err.message);
    process.exit(1);
  });

  db.once('open', () => {
    logger.info('MongoDB connection established');
  });
}
