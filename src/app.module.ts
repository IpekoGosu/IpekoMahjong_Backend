import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
    CommonErrorFilter,
    HttpErrorFilter,
} from '@src/common/filter/error.filter';
import { UserModule } from '@src/modules/user/user.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { WinstonLoggerService } from './common/logger/winston.logger.service';
import { RedisModule } from '@src/modules/redis/redis.module';

@Module({
    imports: [UserModule, RedisModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: CommonErrorFilter,
        },
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
        WinstonLoggerService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
