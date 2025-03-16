import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { CommonSuccessResponse } from '@src/common/response/common.response';
import { Public } from '@src/modules/authorization/public.decorator';
import { JwtDto } from '@src/modules/user/dto/jwt.dto';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { UserLoginDto } from '@src/modules/user/dto/user.login.dto';
import {
    USER_SERVICE,
    UserService,
} from '@src/modules/user/service/user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        @Inject(USER_SERVICE) private readonly userService: UserService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Public()
    async create(
        @Body() userCreateDto: UserCreateDto,
    ): Promise<CommonSuccessResponse<UserDto>> {
        const data = await this.userService.create(userCreateDto);
        return new CommonSuccessResponse<UserDto>(data);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Public()
    async login(
        @Body() userLogDto: UserLoginDto,
        @Res() res: Response,
    ): Promise<void> {
        const data = await this.userService.login(userLogDto, res);
        res.send(new CommonSuccessResponse<JwtDto>(data));
    }

    @Get('renewal')
    @Public()
    async renew(@Req() req: Request): Promise<void> {}
}
