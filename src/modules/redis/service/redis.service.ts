export const REDIS_SERVICE = Symbol('RedisService');

export interface RedisService {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<'OK'>;
    del(key: string): Promise<number>;
    quit(): Promise<void>;
}
