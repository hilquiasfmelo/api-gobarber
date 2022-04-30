import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

import { ICacheProvider } from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private clientRedis: RedisClient;

  constructor() {
    this.clientRedis = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.clientRedis.set(key, JSON.stringify(value));
  }

  public async recover(key: string): Promise<string | null> {
    const data = await this.clientRedis.get(key);

    return data;
  }

  public async invalidate(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { RedisCacheProvider };
