// import { SetMetadata } from '@nestjs/common';
import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //   @SetMetadata('permissions' , ['read:dummy'])
  //   @Get('dummy')
  //   async dummyData() {
  //     return ['apple', 'food', 'orange', 'nest', 'next'];
  //   }
  @Post('create')
  async addUser(
    @Body('firstName') userFirstName: string,
    @Body('lastName') userLastName: string,
    @Body('email') userEmail: string,
    @Body('mobile') userMobile: Array<string>,
  ) {
    const generatedUserId = await this.userService.addUser(
      userFirstName,
      userLastName,
      userEmail,
      userMobile,
    );
    if (generatedUserId === 'ER1') {
      return { msg: 'User Already Exists' };
    } else if (generatedUserId === 'ER2') {
      return { msg: 'The number is already registered' };
    }
    return { msg: 'User Created Successfully!', userId: generatedUserId };
  }
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }
  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    const user = this.userService.getSingleUser(userId);
    return user;
  }
}
