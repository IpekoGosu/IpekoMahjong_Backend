import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from '@src/modules/user/repository/user.repository';
import { UserService } from '@src/modules/user/service/user.service';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly prisma: PrismaClient,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<UserDto> {
    const createUserResult = await this.prisma.$transaction((tx) => {
      userCreateDto.type = 2;
      return this.userRepository.create(userCreateDto, tx);
    });
    return UserDto.fromUserEntityToDto(createUserResult);
  }
}
