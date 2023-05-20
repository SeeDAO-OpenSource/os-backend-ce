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
    let id = base62.encode(Buffer.from(uid, 'hex'))
    for (let i = id.length; i < 10; i++) {
      const index = Math.random() * 62
      id = id + base62Set.charAt(Math.floor(index))
    }
    return id
  }
}