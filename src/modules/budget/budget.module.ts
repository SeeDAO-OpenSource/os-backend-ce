import { Module } from "@nestjs/common";
import { BudgetController } from "./budget.controller";
import { BudgetService } from "./budget.service";
import { PrismaModule } from "src/prisma/module";

const providers = [
  BudgetService,
];

@Module({
  imports: [PrismaModule],
  controllers: [BudgetController],
  providers: providers,
  exports: providers,
})
export class BudgetModule {

}