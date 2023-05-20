import { Module } from "@nestjs/common";
import { ProposalController as ProposalController } from "./proposal.controller";
import { ProposalService } from "./proposal.service";
import { PrismaModule } from "src/prisma/module";

const providers = [
  ProposalService,
]

@Module({
  imports: [],
  controllers: [ProposalController],
  providers: providers,
  exports: providers,
})
export class ProposalModule {

}