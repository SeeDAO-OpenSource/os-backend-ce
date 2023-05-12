import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./service";
import { CommonModule } from "src/common/module";

const providers = [
  PrismaService,
]

@Global()
@Module({
  imports: [CommonModule],
  providers: providers,
  exports: providers,
})
export class PrismaModule { }