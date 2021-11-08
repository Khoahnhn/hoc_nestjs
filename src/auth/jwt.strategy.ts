import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
//import { AuthRepository } from './auth.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) // khai báo để muốn sử dụng UsersRepository vì lúc này UsersRepository có toàn bộ các method để tương tác với entity
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    // phân tích token ra lấy payload truyền vào rồi lấy thông tin trong payload làm điều kiện để tìm thông tin user
    // dua data user vao request
    // thuộc tính user là theo mặc định
    const { username, checkPassword } = payload;
    const user = await this.usersRepository.findOne({ username });
    return user;
  }
  // mỗi module muốn sử dụng AuthGuard() thì phải imports AuthModule và PassportModule
  // để bảo vệ bất kỳ Router Handler or Controller nào thì sử dụng @UseGuards()
}
