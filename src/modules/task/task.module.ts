import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { PrismaModule } from "src/prisma/module";

const providers = [
  TaskService,
];

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: providers,
  exports: providers,
})
export class TaskModule {

}