import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import {Cache} from 'cache-manager'

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    
    async getCache() {
        const value = await this.cacheManager.get('key')
        return value
    }

    async setCache() {
        await this.cacheManager.set('key', 'value')
    }

    async delCache() {
        await this.cacheManager.del('key')
    }

    async resetCache() {
        await this.cacheManager.reset()
    }
}
