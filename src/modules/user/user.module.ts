import { Module } from '@nestjs/common';
import { UserController } from '@src/modules/user/controller/user.controller';
import { UserRepositoryImpl } from '@src/modules/user/repository/impl/user.repository.impl';
import { USER_REPOSITORY } from '@src/modules/user/repository/user.repository';
import { UserServiceImpl } from '@src/modules/user/service/impl/user.service.impl';
import { USER_SERVICE } from '@src/modules/user/service/user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserServiceImpl,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
