import { Injectable } from '@nestjs/common';
import * as snowId from 'simple-flakeid'

const base62Set = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

@Injectable()
export abstract class IdGenerator {
  abstract create(): string
}

export class DefaultIdGenerator implements IdGenerator {
  idgen = new snowId.SnowflakeIdv1({ workerId: 1 })

  create(): string {
    const id = this.idgen.NextNumber()
    let idStr = this.toBase62(id)
    for (let i = idStr.length; i < 10; i++) {
      const index = Math.random() * 62
      idStr = idStr + base62Set.charAt(Math.floor(index))
    }
    return idStr
  }

  toBase62(n: number) {
    if (n === 0) {
      return '0';
    }
    var result = '';
    while (n > 0) {
      result = base62Set[n % base62Set.length] + result;
      n = Math.floor(n / base62Set.length)
    }

    return result;
  }

  fromBase62(s: string) {
    var result = 0;
    for (var i = 0; i < s.length; i++) {
      var p = base62Set.indexOf(s[i]);
      if (p < 0) {
        return NaN;
      }
      result += p * Math.pow(base62Set.length, s.length - i - 1);
    }
    return result;
  }
}