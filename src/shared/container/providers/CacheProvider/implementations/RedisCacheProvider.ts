import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

import { ICacheProvider } from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private clientRedis: RedisClient;

  constructor() {
    this.clientRedis = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.clientRedis.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.clientRedis.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { RedisCacheProvider };
