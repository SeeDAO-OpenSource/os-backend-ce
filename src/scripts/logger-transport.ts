import { Writable } from 'stream';
import pino from 'pino';
import pinoPretty, { PrettyOptions } from 'pino-pretty';

class PrettyTransform extends Writable {
  private readonly prettyPrinter: ReturnType<typeof pinoPretty>;

  constructor(options?: PrettyOptions) {
    super({ objectMode: true });
    this.prettyPrinter = pinoPretty(options);
  }

  _write(chunk: any, encoding: string, callback: (error?: Error | null) => void): void {
    try {
      const logObject = typeof chunk === 'string' ? JSON.parse(chunk) : chunk;
      this.prettyPrinter.write(logObject, (err) => {
        if (err) {
          callback(err);
        } else {
          process.stdout.write('\n');
          callback();
        }
      });
    } catch (err) {
      callback(err);
    }
  }
}

const transport = process.env.NODE_ENV !== 'production'
  ? new PrettyTransform()
  : pino.transport({ target: 'pino/file', options: { destination: process.stdout.fd } });

export default transport;