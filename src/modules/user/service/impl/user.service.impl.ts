import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
    hashPassword,
    matchPassword,
} from '@src/modules/user/helper/bcrypt.hash';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import {
    USER_REPOSITORY,
    UserRepository,
} from '@src/modules/user/repository/user.repository';
import { UserService } from '@src/modules/user/service/user.service';
import { UserLoginDto } from '@src/modules/user/dto/user.login.dto';
import { CommonError } from '@src/common/error/common.error';
import { ERROR_STATUS } from '@src/common/error/error.status';

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly prisma: PrismaClient,
    ) {}

    async create(userCreateDto: UserCreateDto): Promise<UserDto> {
        const createUserResult = await this.prisma.$transaction(async (tx) => {
            userCreateDto.type = 2;
            const encryptedPassword = await hashPassword(
                userCreateDto.password,
            );
            userCreateDto.password = encryptedPassword;
            return await this.userRepository.create(userCreateDto, tx);
        });
        return UserDto.fromUserEntityToDto(createUserResult);
    }

    async login(userLoginDto: UserLoginDto) {
        const dbUser = await this.prisma.$transaction(async (tx) => {
            return await this.userRepository.findByEmail(
                userLoginDto.email,
                tx,
            );
        });

        if (dbUser === null) {
            throw new CommonError(ERROR_STATUS.LOGIN_FAIL_USER_NOT_FOUND);
        }

        const passwordMatch = await matchPassword(
            userLoginDto.password,
            dbUser.password,
        );

        if (!passwordMatch)
            throw new CommonError(ERROR_STATUS.LOGIN_FAIL_INCORRECT_PASSWORD);
    }
}
