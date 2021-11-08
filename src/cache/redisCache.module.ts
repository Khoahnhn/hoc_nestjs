import { CacheModule, Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redisCache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 100000,
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
