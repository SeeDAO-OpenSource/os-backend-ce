// src/Dotbit/Dotbit.module.ts
import { Module } from '@nestjs/common';
import { DotbitController } from './dotbit.controller';
import { DotbitService } from './dotbit.service';
import { PrismaService } from '../prisma.service'; // 请确保这里使用了正确的路径

// import { SgnVerifier } from './dotbit.sgn';
// import { AddressVerifier } from './dotbit.address';
// import { CdkeyVerifier } from './dotbit.cdkey';

@Module({
  controllers: [DotbitController],
  providers: [DotbitService,PrismaService
    // {
    //     provide: 'VERIFIERS',
    //     useFactory: () => {
    //       const verifiers = [];
    //       verifiers.push(new AddressVerifier());
    //       verifiers.push(new CdkeyVerifier()); // CdKey 优先 SGN
    //       verifiers.push(new SgnVerifier());
    //       return verifiers;
    //     },
    //   },
],
})
export class DotbitModule {}
