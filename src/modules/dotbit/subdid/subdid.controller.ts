import { Get, Query, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MintSubDIDInput, MitSubDIDParam, VerifyMintParam, VerifyMintResult } from './subdid.schema';
import { DotbitService } from './subdid.service';

@ApiTags('dotbit-subdid')
@Controller('dotbit/subdid')
export class SubDIDController {
  constructor(private readonly dotbitService: DotbitService) { }

  @Get('can-mint')
  async verifyCanMintSubDID(@Query() input: VerifyMintParam): Promise<VerifyMintResult[]> {
    return this.dotbitService.verifyMintSubDID(input);
  }

  @Get('check-valid')
  async checkSubDID(@Query() param: MitSubDIDParam) {
    return this.dotbitService.checkSubDID(param.address, param.subDID);
  }


  @Post('mint-sign-msg')
  async mintSignMsg(@Body() input: MitSubDIDParam): Promise<{ signMessage: string }> {
    const msg = await this.dotbitService.createMintSubDiDSignMessage(input.address, input.subDID);
    return { signMessage: msg };
  }


  @Post('mint')
  async mint(@Body() input: MintSubDIDInput) {
    return this.dotbitService.mintSubDID(input);
  }

  // CDKEY相关
  // @ApiOperation({ summary: 'generate cdkeys' })
  // @Get('cdkey/generate/:num')
  // async generate(@Param('num') num: number): Promise<void> {
  //   await this.dotbitService.generateSubDIDCdkeys(num);
  // }

}