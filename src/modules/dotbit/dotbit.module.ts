// src/Dotbit/Dotbit.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { WalletModule } from 'src/wallet/ether.module';
import {
  AddressVerifier,
  CdkeyVerifier,
  DotbitService,
  ISubDIDVerifier,
  SGNSubDIDVerifier,
  SUBDID_VERIFIERS,
  SubDIDController
} from './subdid';

@Module({
  imports: [WalletModule],
  controllers: [SubDIDController],
  providers: [
    DotbitService,
    PrismaService,
    AddressVerifier, // 添加 AddressVerifier 到 providers 数组
    CdkeyVerifier,
    SGNSubDIDVerifier,
    {
      provide: SUBDID_VERIFIERS,
      useFactory: (v1: AddressVerifier, v2: CdkeyVerifier, v3: SGNSubDIDVerifier): ISubDIDVerifier[] => {
        return [v1, v2, v3];
      },
      inject: [AddressVerifier, CdkeyVerifier, SGNSubDIDVerifier],
    },
  ],
})

export class DotbitModule { }
