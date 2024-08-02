import { Controller, Post, Provide, Inject, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/UserService';
import { Userdata } from '../interface';

@Provide()
@Controller('/api')
export class UserController {

  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body() body: Userdata): Promise<{ success: boolean; message: string }> {
    const result = await this.userService.login(body);
    return result;
  }

  @Post('/register')
  async register(@Body() body: Userdata): Promise<{ success: boolean; message: string }> {
    const result = await this.userService.register(body);
    return result;
  }
}
