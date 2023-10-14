/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';
import { StatusEnum } from 'src/models/status.enum';
import { SectorEntity } from 'src/sector/entities/sector.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class SolicitationBody{
  @Length(6, 255)
  description: string;

  @IsNotEmpty()
  sector: SectorEntity;

  user_requested: UserEntity;

  code: string;

  status: StatusEnum;

  was_solved: boolean;
}
