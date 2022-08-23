/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';
import { SolicitationEntity } from 'src/solicitation/entities/solicitation.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class SolutionCreate {
  @IsNotEmpty()
  @Length(6, 255)
  description: string;

  user: UserEntity;

  @IsNotEmpty()
  solicitation: SolicitationEntity;
}
