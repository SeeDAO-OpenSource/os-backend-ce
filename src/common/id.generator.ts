import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as baseX from 'base-x';

const base62Set = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const base62 = baseX(base62Set)

@Injectable()
export abstract class IdGenerator {
  abstract create(): string
}

export class DefaultIdGenerator implements IdGenerator {
  create(): string {
    const uid = uuidv4().replace('-', '');
    return base62.encode(Buffer.from(uid, 'hex'))
  }
}