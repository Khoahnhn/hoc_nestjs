import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { User } from '../users/entities/user.entity';
import { AuthLoginDto } from './dto/auth.login.dto';
import { GetUser } from './get-user.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Role, Roles } from '../base/role';
import { CustomValidation } from '../users/pipe/user.validation.pipe';

@Controller('auth')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // )
  // @UsePipes(
  //   new ValidationPipe({
  //     skipMissingProperties: true,
  //   }),
  // )
  @Post('/register')
  // @SerializeOptions({
  //   groups: [Role.User],
  // })
  register(@Body() authRegisterDto: AuthRegisterDto) {
    return authRegisterDto;
    // return this.authService.register(authRegisterDto);
  }

  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: false,
  //     forbidNonWhitelisted: false,
  //   }),
  // )
  @Post('/login')
  login(@Body() authLoginDto: AuthLoginDto): Promise<User> {
    return this.authService.login(authLoginDto);
  }

  @Post('/test')
  @UseGuards(JwtAuthGuard) // sử dụng JwtAuthGuard/AuthGuard để bảo vệ api (sử dụng được bearer token)
  test(@GetUser() user: User, @Req() req) {
    //console.log(req);
    //console.log(user);
  }
}
