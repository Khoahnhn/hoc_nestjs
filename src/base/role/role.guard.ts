import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from './role.decorator';

function matchRoles(roles, userRole) {
  return roles.some((role) => role === userRole);
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // if (!matchRoles(roles, user.role)) {
    //   throw new Error('khong co quyen nha');
    // }
    // return true;

    return roles.some((role) => user.role?.includes(role));
  }
}
