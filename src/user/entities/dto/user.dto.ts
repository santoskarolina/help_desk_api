import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserTypeEnum } from 'src/models/userType.enum';
import { SectorEntity } from 'src/sector/entities/sector.entity';
import { UserEntity } from '../user.entity';

export type UserLogin = Pick<UserEntity, 'email' | 'password'>;

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @IsNotEmpty()
  @Length(6, 255)
  name: string;

  @IsNotEmpty()
  user_type: UserTypeEnum;
}
