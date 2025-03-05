import { user } from '@prisma/client';

export class UserEntity implements user {
  id: number;
  email: string;
  name: string;
  password: string;
  type: number;
  created_at: Date | null;
  updated_at: Date | null;
}
