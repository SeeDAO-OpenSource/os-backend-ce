import { Body, Controller, Get, Injectable, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginResult, SignMessageResult, UserLoginInput } from "./auth.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ethers } from "ethers";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiResponse({ type: LoginResult, status: 200, description: '登录' })
  login(@Body() input: UserLoginInput): Promise<LoginResult> {
    input.wallet = ethers.utils.getAddress(input.wallet);
    return this.authService.login(input);
  }

  @Get('login/sign-msg')
  @ApiResponse({ type: SignMessageResult, status: 200, description: '获取登录签名' })
  async getSignMessage(@Query("wallet") wallet: string): Promise<SignMessageResult> {
    wallet = ethers.utils.getAddress(wallet);
    const msg = await this.authService.getLoginSignMessage(wallet);
    return {
      message: msg,
      wallet,
    };
  }

}