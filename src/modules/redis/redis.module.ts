import { Module } from '@nestjs/common';
import { RedisServiceImpl } from '@src/modules/redis/service/impl/redis.service.impl';
import { REDIS_SERVICE } from '@src/modules/redis/service/redis.service';

@Module({
    providers: [
        {
            provide: REDIS_SERVICE,
            useClass: RedisServiceImpl,
        },
    ],
    exports: [
        {
            provide: REDIS_SERVICE,
            useClass: RedisServiceImpl,
        },
    ],
})
export class RedisModule {}
