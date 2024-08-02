import { Provide, Controller,   Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/UserService';
import { InterestGroupService } from '../service/InterestGroupService';

@Provide()
@Controller('/api')
export class APIController {

  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  interestGroupService: InterestGroupService;
}
