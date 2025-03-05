import { user } from '@prisma/client';
import { UserCreateDto } from '@src/modules/user/dto/user.create.dto';

export interface UserRepository {
  create(data: UserCreateDto): Promise<user>;
}
