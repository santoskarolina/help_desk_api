import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SolicitationEntity } from '../../solicitation/entities/solicitation.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'solution', schema: 'help_desk' })
export class SolutionEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  description: string;

  @ManyToOne(() => SolicitationEntity)
  @JoinColumn({ name: 'solicitation_id', referencedColumnName: 'id',  })
  solicitation: SolicitationEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id',  })
  user: UserEntity;
}
