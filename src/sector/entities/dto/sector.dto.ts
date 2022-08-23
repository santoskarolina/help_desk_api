/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';

export class CreateSectorDTo {
  @IsNotEmpty()
  @Length(3, 255)
  name: string;
}
