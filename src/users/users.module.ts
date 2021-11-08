import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import { RedisCacheModule } from '../cache/redisCache.module';

@Module({
  imports: [
    //PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UsersRepository]),
    AuthModule,
    RedisCacheModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
