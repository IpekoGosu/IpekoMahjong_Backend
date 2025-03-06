import { Body, Controller, Post } from '@nestjs/common';
import { CommonSuccessResponse } from '@src/common/response/common.response';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { UserService } from '@src/modules/user/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() userCreateDto: UserCreateDto,
  ): Promise<CommonSuccessResponse<UserDto>> {
    const data = await this.userService.create(userCreateDto);
    return new CommonSuccessResponse<UserDto>(data);
  }
}
