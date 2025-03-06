import { Injectable } from '@nestjs/common';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { UserRepository } from '@src/modules/user/repository/user.repository';
import { UserService } from '@src/modules/user/service/user.service';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userCreateDto: UserCreateDto): Promise<UserDto> {
    const createUserResult = await this.userRepository.create(userCreateDto);
    return UserDto.fromUserEntityToDto(createUserResult);
  }
}
