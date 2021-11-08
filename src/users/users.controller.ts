import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { User } from './entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role, RoleGuard, Roles } from '../base/role';
import { UpdateUserDto } from './dto/users.dto';
import { CustomValidation } from './pipe/user.validation.pipe';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  //  @Roles(Role.Admin)
  //  @UseGuards(JwtAuthGuard, RoleGuard)
  @SerializeOptions({
    groups: [Role.Admin],
  })
  listUser(): Promise<User[]> {
    return this.usersService.listUser();
  }

  @Get('/me')
  // @UseGuards(JwtAuthGuard)
  getMe(@GetUser() user: User) {
    return this.usersService.getMe(user);
  }

  @Get('/:id')
  // @UseGuards(JwtAuthGuard)
  @SerializeOptions({
    groups: [Role.User],
  })
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  // @UsePipes(new CustomValidation())
  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
