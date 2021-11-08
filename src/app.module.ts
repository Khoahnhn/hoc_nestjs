import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MessageModule } from './message/message.module';
import { RedisCacheModule } from './cache/redisCache.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RoleGuard } from './base/role';
import { UploadFileModule } from './upload-file/upload-file.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    MessageModule,
    UploadFileModule,
    ProductModule,
    // RedisCacheModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule {}
