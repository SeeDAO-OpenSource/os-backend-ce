import { Global, Module } from "@nestjs/common";
import { DefaultIdGenerator, IdGenerator } from "./id";

const providers = [
  {
    provide: IdGenerator,
    useClass: DefaultIdGenerator
  }
]

@Global()
@Module({
  providers,
  exports: providers,
})
export class CommonModule { }