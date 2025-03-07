import { UserEntity } from '@src/modules/user/entity/user.entity';

export class UserDto {
    constructor(
        email: string,
        name: string,
        type: number,
        createdAt: Date | null,
        updatedAt: Date | null,
    ) {
        this.email = email;
        this.name = name;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    email: string;
    name: string;
    type: number;
    createdAt: Date | null;
    updatedAt: Date | null;

    static fromUserEntityToDto(userEntity: UserEntity) {
        return new UserDto(
            userEntity.email,
            userEntity.name,
            userEntity.type,
            userEntity.created_at,
            userEntity.updated_at,
        );
    }
}
