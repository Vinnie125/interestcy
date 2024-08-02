import { Controller, Post, Provide, Inject, Body, Get } from '@midwayjs/core';
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

  @Post('/create-group')
  async createGroup(@Body() groupInfo: Circle):Promise<{ success: boolean; message: string }> {
    const newGroup = await this.interestGroupService.createGroup(groupInfo);
    return newGroup;
  }

  @Get('/my-groups')
  async getMyGroups() {
    const groups = await this.interestGroupService.getMyGroups();
    return groups;
  }
}
