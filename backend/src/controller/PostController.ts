import { Controller, Post, Provide, Inject, Body} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PostService } from '../service/PostService';
import { POST } from '../interface';

@Provide()
@Controller('/api')
export class PostController {

  @Inject()
  ctx: Context;

  @Inject()
  postservice: PostService;

  @Post('/createpost')//创建兴趣圈
  async createPost(@Body() groupInfo: POST):Promise<{ success: boolean; message: string }> {
    const newGroup = await this.postservice.createPost(groupInfo);
    return newGroup;
  }
  
}
