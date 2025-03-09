import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommonError } from '@src/common/error/common.error';
import { ERROR_STATUS } from '@src/common/error/error.status';
import {
    AUTH_SERVICE,
    AuthService,
} from '@src/modules/authorization/service/auth.service';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { UserLoginDto } from '@src/modules/user/dto/user.login.dto';
import {
    hashPassword,
    matchPassword,
} from '@src/modules/user/helper/bcrypt.hash';
import {
    USER_REPOSITORY,
    UserRepository,
} from '@src/modules/user/repository/user.repository';
import { UserService } from '@src/modules/user/service/user.service';

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(AUTH_SERVICE)
        private readonly authService: AuthService,
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

        const userDto = UserDto.fromUserEntityToDto(dbUser);

        return {
            accessToken: this.authService.createAccessToken(userDto),
            refreshToken: this.authService.createRefreshToken(userDto),
        };
    }

    async findById(id: number) {
        const user = await this.prisma.$transaction(async (tx) =>
            this.userRepository.findById(id, tx),
        );
        return UserDto.fromUserEntityToDto(user);
    }
}
