import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';

export interface UserService {
  create(userCreateDto: UserCreateDto): Promise<UserDto>;
}
