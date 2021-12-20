import { CacheModule, Inject, Module, CACHE_MANAGER, CacheInterceptor } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store'
import { RedisService } from './redis.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Cache } from 'cache-manager'

@Module({
    imports: [
    CacheModule.registerAsync({
            useFactory: () => {
                return {
                    store: redisStore,
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT
                } 
            },
        })
    ],
    providers: [RedisService, {
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor
    }],
    exports: [RedisService, RedisModule]
})

export class RedisModule {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
}
