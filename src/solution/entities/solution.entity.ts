import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SolicitationEntity } from '../../solicitation/entities/solicitation.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'solution' })
export class SolutionEntity {
  @PrimaryGeneratedColumn()
  solution_id: number;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  description: string;

  @ManyToOne(() => SolicitationEntity)
  @JoinColumn({
    name: 'solicitation_id',
    referencedColumnName: 'solicitation_id',
  })
  solicitation: SolicitationEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;
}
