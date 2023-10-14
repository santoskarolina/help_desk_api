import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { StatusEnum } from '../../models/status.enum';
import { SectorEntity } from '../../sector/entities/sector.entity';
import { SolutionEntity } from '../../solution/entities/solution.entity';

@Entity({ name: 'solicitation', schema: 'help_desk' })
export class SolicitationEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ name: 'code', type: 'varchar', nullable: false, length: 255 })
  code: string;

  @ManyToOne(
    () => UserEntity,
    (user_requested: UserEntity) => user_requested.solicitations,
  )
  @JoinColumn({ name: 'user_requested', referencedColumnName: 'id' })
  user_requested: UserEntity;

  @Column({ name: 'was_solved', type: 'boolean', nullable: false })
  was_solved: boolean;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  description: string;

  @Column({ name: 'status', type: 'enum', nullable: false, enum: StatusEnum })
  status: StatusEnum;

  @ManyToOne(() => SectorEntity)
  @JoinColumn({ name: 'sector', referencedColumnName: 'id',  })
  sector: SectorEntity;

  @OneToMany(() => SolutionEntity, (solutions) => solutions.solicitation)
  solutions: SolutionEntity[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closed_at: Date;
}
