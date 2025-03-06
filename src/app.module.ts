import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  CommonErrorFilter,
  HttpErrorFilter,
} from '@src/common/filter/error.filter';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CommonErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
