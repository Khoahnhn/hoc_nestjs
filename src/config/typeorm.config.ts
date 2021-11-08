import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersSubscriber } from '../users/users.subscriber';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1131998',
  database: 'demo_backend',
  entities: ['dist/**/*.entity{.ts,.js}'],
  //entities: [__dirname + '/**/*.entity.{js,ts}'],
  subscribers: [UsersSubscriber],
  synchronize: true,
};
