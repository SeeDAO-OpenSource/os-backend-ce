import { ApiProperty } from "@nestjs/swagger"

export class UserLoginInput {

  @ApiProperty({ description: '用户钱包地址', required: true })
  wallet: string

  @ApiProperty({ description: '用户签名', required: true })
  signature: string
}

export class JwtUserClaims {
  sub: string
  wallet: string
  nickname: string
}

export class LoginResult {
  @ApiProperty({ description: '用户签名', required: true })
  id: string

  @ApiProperty({ description: '用户签名', required: true })
  wallet: string

  @ApiProperty({ description: '用户签名', required: false })
  nickname: string

  @ApiProperty({ description: 'token', required: true })
  accessToken: string
}

export class SignMessageResult {
  @ApiProperty({ description: '用户签名消息', required: true })
  message: string
  @ApiProperty({ description: '钱包地址', required: true })
  wallet: string
}