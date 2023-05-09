import { Get, Query, Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { VerifyMintParam, VerifyMintResult, MintSubDIDInput, MintSubDIDResult } from './dotbit.dto';
import { DotbitService } from './dotbit.service';
import { SubDIDCdkey } from './dotbit.interface';
import { SubDIDCdkeyDto } from './dotbit.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiQuery , ApiBody, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('dotbit')
@Controller('dobit')
export class DotbitController {
  constructor(private readonly dotbitService: DotbitService) {}

  @ApiQuery({ name: 'address', type: String })
  @ApiOkResponse({ type: [VerifyMintResult] })
  @Get('subdid/can-mint')
  async verifyMintSubDID(@Query('address') address: string): Promise<VerifyMintResult[]> {
    return this.dotbitService.verifyMintSubDID( address );
  }

  // @Get('subdid/check-valid')
  // async checkSubDID(@Body('subDID') subDID: string, @Body('address') address: string): Promise<VerifyMintResult> {
  //   return this.dotbitService.checkSubDID(subDID, address);
  // }

  // @Post('subdid/mint-sign-msg')
  // async createMintSubDiDSignMessage(@Body('address') address: string, @Body('subDID') subDID: string): Promise<string> {
  //   return this.dotbitService.createMintSubDiDSignMessage(address, subDID);
  // }

  // @ApiOperation({ summary: 'Mint SubDID' })
  // @ApiResponse({ status: 200, description: 'The minting process was successful.', type: MintSubDIDResult })
  // @ApiResponse({ status: 500, description: 'Internal server error.', type: MintSubDIDResult })
  // @Post('subdid/mint')
  // async mintSubDID(@Body() input: MintSubDIDInput): Promise<MintSubDIDResult> {
  //   try {
  //     return await this.dotbitService.mintSubDID(input);
  //   } catch (err: any) {
  //     // NestJS 的异常过滤器会自动处理抛出的错误
  //     throw new HttpException({ message: err.message, isErr: true }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }  }


}