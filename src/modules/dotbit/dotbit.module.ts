// src/Dotbit/Dotbit.module.ts
import { Module } from '@nestjs/common';
import { DotbitController } from './dotbit.controller';
import { DotbitService } from './dotbit.service';
import { PrismaService } from '../../prisma/service'; // 请确保这里使用了正确的路径

import { SGNSubDIDVerifier } from './dotbit.sgn';
import { AddressVerifier } from './dotbit.address';
import { CdkeyVerifier } from './dotbit.cdkey';

@Module({
  controllers: [DotbitController],
  providers: [
    DotbitService,
    PrismaService,
    AddressVerifier, // 添加 AddressVerifier 到 providers 数组
    CdkeyVerifier,
    SGNSubDIDVerifier,
    {
      provide: 'VERIFIERS',
      useFactory: (dotbitService: DotbitService) => {
        const verifiers = [];
         verifiers.push(new AddressVerifier(dotbitService));
         verifiers.push(new CdkeyVerifier(dotbitService)); // CdKey 优先 SGN
         verifiers.push(new SGNSubDIDVerifier(dotbitService));
        return verifiers;
      },
      inject: [DotbitService], // 通过添加 inject 数组，NestJS 将会知道在调用 useFactory 时需要注入哪些依赖
    },
  ],
})


export class DotbitModule {}
