import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  CommonErrorFilter,
  HttpErrorFilter,
} from '@src/common/filter/error.filter';
import { UserModule } from '@src/modules/user/user.module';

@Module({
  imports: [UserModule],
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
