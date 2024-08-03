import { Controller, Post, Provide, Inject, Body, Get,Param} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InterestGroupService } from '../service/InterestGroupService';
import { Circle } from '../interface';

@Provide()
@Controller('/groups')
export class InterestGroupController {

  @Inject()
  ctx: Context;

  @Inject()
  interestGroupService: InterestGroupService;

  @Post('/create-group')//创建兴趣圈
  async createGroup(@Body() groupInfo: Circle):Promise<{ success: boolean; message: string }> {
    const newGroup = await this.interestGroupService.createGroup(groupInfo);
    return newGroup;
  }

  @Get('/my-groups')//我的圈子
  async getMyGroups() {
    const groups = await this.interestGroupService.getMyGroups();
    return groups;
  }

  @Get('/:groupId/posts')//查看兴趣圈功能
  async getPosts(@Param('groupId') groupId: string) {
    // 假设获取帖子列表的逻辑
    const posts = await this.getPostsByGroupId(groupId);
    return {
      success: true,
      posts,
    };
  }

  async getPostsByGroupId(groupId: string) {
    // 模拟数据
    return [
      {
        user: {
          username: '用户1',
          avatar: '../../images/cycle1.jpg',
        },
        content: '这是用户1的帖子内容',
        comments: [],
      },
      {
        user: {
          username: '用户2',
          avatar: 'https://example.com/avatar2.png',
        },
        content: '这是用户2的帖子内容',
        comments: [],
      },
    ];
  }
}
