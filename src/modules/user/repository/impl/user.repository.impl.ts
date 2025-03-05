import { Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserRepository } from '@src/modules/user/repository/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(userCreateDto: UserCreateDto): Promise<user> {
    return this.prisma.user.create({ data: userCreateDto });
  }
}
