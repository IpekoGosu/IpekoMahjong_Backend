import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommonSuccessResponse } from '@src/common/response/common.response';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { UserLoginDto } from '@src/modules/user/dto/user.login.dto';
import {
    USER_SERVICE,
    UserService,
} from '@src/modules/user/service/user.service';

@Controller('user')
export class UserController {
    constructor(
        @Inject(USER_SERVICE) private readonly userService: UserService,
    ) {}

    @Post()
    async create(
        @Body() userCreateDto: UserCreateDto,
    ): Promise<CommonSuccessResponse<UserDto>> {
        const data = await this.userService.create(userCreateDto);
        return new CommonSuccessResponse<UserDto>(data);
    }

    @Post('login')
    async login(@Body() userLogDto: UserLoginDto): Promise<any> {
        const data = await this.userService.login(userLogDto);
        return new CommonSuccessResponse<any>(data);
    }
}
