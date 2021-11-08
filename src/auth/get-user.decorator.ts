import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

export const GetUser = createParamDecorator(
  // tao mot deco param
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest(); // lay toan bo thong tin tu req
    return req.user;
  },
);
