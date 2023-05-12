import { Module } from "@nestjs/common";
import { ToolController as ToolController } from "./controller";
import { ToolService } from "./service";
import { PrismaModule } from "src/prisma/module";

const providers = [
  ToolService,
]

@Module({
  imports: [],
  controllers: [ToolController],
  providers: providers,
  exports: providers,
})
export class ToolModule {

}