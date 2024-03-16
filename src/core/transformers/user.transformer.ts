import { User } from '@prisma/client';
import { UserResponseDTO } from '../DTO/users/user.dto';

export const userTransformer = (user: User): UserResponseDTO => {
  return {
    uuid: user.uuid,
    username: user.username,
    region: user.region,
  };
};

export const usersTransformer = (users: User[]): UserResponseDTO[] => {
  return users.map((user) => userTransformer(user));
};
