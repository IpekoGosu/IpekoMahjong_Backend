import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommonSuccessResponse } from '@src/common/response/common.response';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import {
  USER_SERVICE,
  UserService,
} from '@src/modules/user/service/user.service';

@Controller('users')
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
}
