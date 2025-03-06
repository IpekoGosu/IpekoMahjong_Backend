import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { UserService } from '@src/modules/user/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserDto> {
    return this.userService.create(userCreateDto);
  }
}
