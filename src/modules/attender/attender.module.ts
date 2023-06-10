import { Module } from "@nestjs/common";
import { AttenderController } from "./attender.controller";
import { AttenderService } from "./attender.service";
import { PrismaModule } from "src/prisma/module";

const providers = [
  AttenderService,
];

@Module({
  imports: [PrismaModule],
  controllers: [AttenderController],
  providers: providers,
  exports: providers,
})
export class AttenderModule {

}