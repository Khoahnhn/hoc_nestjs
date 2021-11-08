import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { RedisCacheService } from '../cache/redisCache.service';
import { UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private redisCacheService: RedisCacheService,
  ) {}

  async listUser(): Promise<User[]> {
    const users = await this.usersRepository.listAllUser();
    await this.redisCacheService.set('key', JSON.stringify(users));
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.getUserById(id);

    await this.redisCacheService.set(user.id, JSON.stringify(user));

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    return this.usersRepository.deleteUser(id);
  }

  async getMe(user: User): Promise<User> {
    const user1 = await this.usersRepository.getUserByUsername(user.username);

    console.log(user1.createdAt);
    console.log(user1.createdAt.toString());

    delete user1.password;
    return user1;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersRepository.updateInfoUser(userId, updateUserDto);
  }
}
