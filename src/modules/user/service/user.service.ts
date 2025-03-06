import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';

export const USER_SERVICE = Symbol('UserService');

export interface UserService {
  create(userCreateDto: UserCreateDto): Promise<UserDto>;
}
