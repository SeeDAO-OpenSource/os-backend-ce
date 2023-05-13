import { Module } from "@nestjs/common";
import { ToolController as ToolController } from "./tool.controller";
import { ToolService } from "./tool.service";
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