import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { UserLoginDto } from '@src/modules/user/dto/user.login.dto';

export const USER_SERVICE = Symbol('UserService');

export interface UserService {
    create(userCreateDto: UserCreateDto): Promise<UserDto>;
    findById(id: number): Promise<UserDto>;
    login(userLoginDto: UserLoginDto): Promise<any>;
}
