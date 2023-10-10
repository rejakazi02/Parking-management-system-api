import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../interfaces/user/user.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
