import { Global, Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { CacheModule } from "@nestjs/cache-manager";
const providers = [
  WalletService,
]

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: providers,
  exports: providers,
})
export class WalletModule { }