import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { User } from '../users/entities/user.entity';
import { AuthLoginDto } from './dto/auth.login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from '../users/users.repository';
import { jwtSecret } from './auth.secret';
import * as bcrypt from 'bcrypt';
import { RedisCacheService } from '../cache/redisCache.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) // khai bao InjectRepository(file repository A ) phai truyen vao dung class dc dinh nghia trong repo de co the su dung cac method trong file A
    private userRepository: UsersRepository,
    private jwtService: JwtService,
    private redisCacheService: RedisCacheService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<User> {
    return this.userRepository.createNewUser(authRegisterDto);
  }

  // async register(authRegisterDto: AuthRegisterDto): Promise<User> {
  //   return this.userRepository.save(authRegisterDto);
  // }

  async login(authLoginDto: AuthLoginDto): Promise<User> {
    const { username, password } = authLoginDto;
    const user = await this.userRepository.getUserByUsername(username);
    // if (!user || !(await user.comparePassword(password))) {
    if (!user || !(await bcrypt.compareSync(password, user.password))) {
      // if (!user) {
      throw new BadRequestException({
        messages: 'Wrong username or password',
        errorCode: 'AUTH',
      });
    }

    const accessToken = await this.createToken(
      authLoginDto.username,
      user.password,
    );

    // const payload: JwtPayload = { username };
    // const accessToken = await this.jwtService.sign(payload);

    //const accessToken = jwt.sign(payload, jwtSecret.secret);
    //const decoded = await this.jwtService.verify(accessToken);
    //const decoded = jwt.verify(accessToken, jwtSecret.secret);

    //const infoUser = await this.userRepository.getUserByUsername(username);

    const refreshToken = await this.createRefreshToken(
      authLoginDto.username,
      user.password,
    );

    user['token_type'] = 'bearer';
    user['token'] = accessToken;
    user['refresh_token'] = refreshToken;
    delete user.password;

    await this.redisCacheService.set(user.id + ' refresh-token', refreshToken);

    return user;
  }

  async createToken(username: string, password: string): Promise<string> {
    const payload: JwtPayload = {
      username,
      checkPassword: password.slice(0, 10),
    };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

  async createRefreshToken(
    username: string,
    password: string,
  ): Promise<string> {
    const payload: JwtPayload = {
      username,
      checkPassword: password.slice(0, 10),
    };

    const refreshToken = await this.jwtService.sign(payload, {
      secret: 'khoahn',
      expiresIn: '7d',
    });
    return refreshToken;
  }
}
