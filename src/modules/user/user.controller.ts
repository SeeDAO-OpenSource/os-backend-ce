import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException,  } from '@nestjs/common';
import { UserService } from './user.service';
import { 
    User, 
    Role,   
    SystemUser,
    AuthGoogle,
    AuthTwitter,
    AuthDiscord,
    AuthGithub,
    AuthTelegram,
    AuthWechat,
    AuthZoom, 
} from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

//   @Get()
//   async findUsers(): Promise<User[]> {
//     return this.userService.findUsers();
//   }

//   @Get(':id')
//   async findUserById(@Param('id') id: string): Promise<User> {
//     const user = await this.userService.findUserById(id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//     return user;
//   }

  @Post()
  async createUser(@Body() wallet: string): Promise<User> {
    return this.userService.createUser(wallet);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData:User,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updateData);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('quickGetList')
  async quickGetList(@Body() data: any) {
    return await this.userService.quickGetList(data);
  }

  @Post('findUsersById')
  async findUsersById(@Body() users: any[]) {
    return await this.userService.findUsersById(users);
  }



//   @Get('findUserByDiscordId/:id')
//   async findUserByDiscordId(@Param('id') id: string) {
//     return await this.userService.findUserByDiscordId(id);
//   }

//   @Post('createUserIfNotExist')
//   async createUserIfNotExist(@Body('wallet') wallet: string) {
//     return await this.userService.createUserIfNotExist(wallet);
//   }

//   @Post('walletLogin')
//   async walletLogin(@Body() body: { wallet: string; msgObj: any; signed: string }) {
//     const { wallet, msgObj, signed } = body;
//     return await this.userService.walletLogin(wallet, msgObj, signed);
//   }

//   @Post('pingUser')
//   async pingUser(@Body() data: any) {
//     return await this.userService.pingUser(data);
//   }
}

