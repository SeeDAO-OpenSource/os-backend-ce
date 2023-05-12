import { Get, Query, Body, Controller, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { VerifyMintParam, VerifyMintResult, MintSubDIDInput, MintSubDIDResult, SubDIDMintRecordCreateDto, SubDIDMintRecordDto } from './dotbit.dto';
import { InsertSGNMintRecordDto, QuerySgnMintRecordDto, SGNMintRecordModel , SubDIDCdKeyDto, MintSignMsgDto } from './dotbit.dto';

import { DotbitService  } from './dotbit.service';
import { SubDIDCdkey, VerifyMintContext } from './dotbit.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiQuery , ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SubDIDMintRecord, SGNMintRecord, SubDIDCdKey  } from '@prisma/client';

@ApiTags('dotbit')
@Controller('dotbit')
export class DotbitController {
  constructor(private readonly dotbitService: DotbitService) {}


  @Get('varify')
  async verify(@Query('address') address: string) {
    const ctx: VerifyMintContext = {
      address: address,
      isHandled: false,
      results: [],
    };
    for (const verifier of this.dotbitService.getVerifiers()) {
      if (!ctx.isHandled) {
        await verifier.verify(ctx);
      }
    }
    return ctx.results;
  }

  @Get('subdid/can-mint')
  @ApiOperation({ summary: 'can-mint' })
  @ApiResponse({ status: 200, description: 'Can mint.' })
  async verifyCanMintSubDID(  
    @Query('address') address: string,
    ) {
    return this.dotbitService.verifyMintSubDID(address);
  }

  @Get('subdid/check-valid')
  @ApiOperation({ summary: 'Mint a SubDID' })
  @ApiResponse({ status: 200, description: 'Minted successfully.' })
  async checkSubDID(  
    @Query('address') address: string,
    @Query('subDID')  subDID: string,
    ) {
    return this.dotbitService.checkSubDID(address, subDID);
  }

  
  @Post('/subdid/mint-sign-msg')
  @ApiOperation({ summary: 'Sign Message' })
  @ApiResponse({ status: 200, description: 'Signed Message successfully.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        subDID: { type: 'string' },
      },
      required: ['address', 'subDID'],
    },
  })
  async mintSignMsg(  
    @Body('address') address: string,
    @Body('subDID') subDID: string,
    ) {
    return this.dotbitService.createMintSignMsg(address, subDID);
  }


  @Post('/subdid/mint')
  @ApiOperation({ summary: 'Mint a SubDID' })
  @ApiResponse({ status: 200, description: 'Minted successfully.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        subDID: { type: 'string' },
        signature: { type: 'string' },
      },
      required: ['address', 'subDID' ,'signature'],
    },
  })
  async mint(@Body() createDto: MintSubDIDInput) {
    return this.dotbitService.insertSubDIDMintRecord(createDto);
  }


  // CDKEY相关
  @ApiOperation({ summary: 'generate cdkeys' })
  @Get('cdkey/generate/:num')
  async generate(@Param('num') num: number): Promise<void> {
    await this.dotbitService.generateSubDIDCdkeys(num);
  } 


  @ApiOperation({ summary: 'Get cdkey' })
  @ApiResponse({ status: 200, description: 'The found record', type: SubDIDCdKeyDto })
  @Get('/cdkey/:key')
  async getCdkey(@Param('key') key: string, @Query('all') all: boolean): Promise<SubDIDCdKey | undefined> {
    return await this.dotbitService.getCdkey(key, all);
  }
  
  
  @Post('/cdkey/consume')
  @ApiOperation({ summary: 'Consume a SubDID CD key' })
  @ApiResponse({ status: 200, description: 'The CD key has been consumed successfully.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        key: { type: 'string' },
        address: { type: 'string' },
        subDID: { type: 'string' },
      },
      required: ['key','address', 'subDID'],
    },
  })
  async consumeKey(
    @Body('key') key: string,
    @Body('address') address: string,
    @Body('subDID') subDID: string,
  ): Promise<void> {
    await this.dotbitService.consumeKey(key, address, subDID);
  }
    
  
  

  // SGN相关
  @ApiOperation({ summary: 'Get SubDIDMintRecord by address' })
  @ApiQuery({ name: 'address', type: String })
  @ApiResponse({ status: 200, description: 'SubDIDMintRecord found', type: SubDIDMintRecordDto })
  @Get('subdid/get')
  async getSubDIDMintRecord(@Query('address') address: string): Promise<SubDIDMintRecordDto> {
    return this.dotbitService.getSubDIDMintRecord(address);
  }

  
  @ApiOperation({ summary: 'Insert a new SGN Mint Record' })
  @ApiBody({ type: InsertSGNMintRecordDto })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('/sgn/insert')
  async insertSgnMintRecord(@Body() record: InsertSGNMintRecordDto): Promise<void> {
    await this.dotbitService.insertSgnMintRecord(record);
  }

  @ApiOperation({ summary: 'Query a SGN Mint Record by tokenId' })
  @ApiResponse({ status: 200, description: 'The found record', type: SGNMintRecordModel })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get('/sgn/query')
  async querySgnMintRecord(@Query() query: QuerySgnMintRecordDto): Promise<SGNMintRecord | null> {
    return await this.dotbitService.querySgnMintRecord(BigInt(query.tokenId));
  }

  @ApiOperation({ summary: 'Check if a token has been minted' })
  @ApiResponse({ status: 200, description: 'The result of the check', type: Boolean })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get('/sgn/minted')
  async hasMinted(@Query() query: QuerySgnMintRecordDto): Promise<boolean> {
    return await this.dotbitService.sgnHasMinted(BigInt(query.tokenId));
  }


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