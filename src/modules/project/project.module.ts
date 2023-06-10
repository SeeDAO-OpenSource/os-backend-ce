import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { PrismaModule } from "src/prisma/module";

const providers = [
  ProjectService,
];

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: providers,
  exports: providers,
})
export class ProjectModule {

}