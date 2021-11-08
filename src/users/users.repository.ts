import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthRegisterDto } from '../auth/dto/auth.register.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/users.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUserByUsername(username: string): Promise<User> {
    return await this.findOne({
      where: {
        username: username,
      },
    });
  }

  async listAllUser(): Promise<User[]> {
    return await this.find({
      withDeleted: true,
      //select: ['id', 'username', 'role'],
      //excludeSelect: ['password'],
    });
  }

  async getUserById(id: number): Promise<User> {
    return await this.findOne({
      where: {
        id: id,
      },
      withDeleted: true,
      //select: ['id', 'username', 'role'],
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    if (!!user) await this.softDelete({ id });
  }

  async createNewUser(authRegisterDto: AuthRegisterDto): Promise<User> {
    const { username, password } = authRegisterDto;

    // const user = new User();
    // user.username = username;
    // user.salt = await bcrypt.genSalt();
    // user.password = await this.hashPassword(password, user.salt);
    //
    // try {
    //   await user.save();
    //   return user;
    // } catch (error) {
    //   if (error.code === '23505') {
    //     throw new ConflictException('Username already exists');
    //   } else {
    //     throw new InternalServerErrorException();
    //   }

    let user = await this.findOne({ username });
    if (user) {
      throw new BadRequestException({
        me: 'User already exists',
        code: 'AUTH',
      });
    }
    user = await this.create(authRegisterDto);
    return await this.save(user);

    //return await this.save(authRegisterDto);
  }

  async updateInfoUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const user = await this.createQueryBuilder()
      .update(User)
      .set({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      })
      .where('id = :id', { id: userId })
      .execute();
    return user.raw[0];
  }
}
