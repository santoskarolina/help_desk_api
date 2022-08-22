import { UserEntity } from '../user.entity';

export type UserDto = Pick<
  UserEntity,
  'name' | 'email' | 'password' | 'user_type' | 'sector'
>;

export type UserLogin = Pick<UserEntity, 'email' | 'password'>;
