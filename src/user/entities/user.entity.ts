import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeEnum } from '../../models/userType.enum';
import { SectorEntity } from '../../sector/entities/sector.entity';
import { SolicitationEntity } from '../../solicitation/entities/solicitation.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

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

  @ManyToOne(() => SectorEntity)
  @JoinColumn({ name: 'sector_id', referencedColumnName: 'sector_id' })
  sector: SectorEntity;

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
