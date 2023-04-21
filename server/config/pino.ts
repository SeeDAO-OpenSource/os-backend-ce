import fs from 'fs';
import path from 'path';
import pinoms from 'pino-multi-stream';

const destLog = path.resolve(__dirname, '../../logs/pino.log');
const destErrors = path.resolve(__dirname, '../../logs/errors.log');

const streams = {
    streams: [
        { stream: process.stdout },
        { level: 'trace', stream: fs.createWriteStream(destLog) },
        { level: 'debug', stream: fs.createWriteStream(destLog) },
        { level: 'info', stream: fs.createWriteStream(destLog) },
        { level: 'error', stream: fs.createWriteStream(destErrors) },
        { level: 'fatal', stream: fs.createWriteStream(destErrors) }
    ]
} as pinoms.LoggerOptions;

export default pinoms(streams);