import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeEnum } from '../../models/userType.enum';
import { SolicitationEntity } from '../../solicitation/entities/solicitation.entity';

@Entity({ name: 'user' , schema: 'help_desk'})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    name: 'user_type',
    type: 'enum',
    nullable: false,
    enum: UserTypeEnum,
  })
  user_type: UserTypeEnum;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => SolicitationEntity,
    (solicitations: SolicitationEntity) => solicitations.user_requested,
  )
  solicitations: SolicitationEntity[];
}
