import { Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { CommonError } from '@src/common/error/common.error';
import { ERROR_STATUS } from '@src/common/error/error.status';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserRepository } from '@src/modules/user/repository/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  async create(
    userCreateDto: UserCreateDto,
    tx: Prisma.TransactionClient,
  ): Promise<user> {
    try {
      return await tx.user.create({ data: userCreateDto });
    } catch (error) {
      console.error(error);
      throw new CommonError(ERROR_STATUS.DB_INSERT_ERROR);
    }
  }
}
