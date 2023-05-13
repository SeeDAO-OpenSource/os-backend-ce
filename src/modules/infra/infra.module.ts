import { Module } from "@nestjs/common";
import { ToolController as ToolController } from "./infra.controller";
import { ToolService } from "./infra.service";
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