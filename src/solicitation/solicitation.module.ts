import { Module } from '@nestjs/common';
import { SolicitationService } from './services/solicitation.service';
import { SolicitationController } from './controllers/solicitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitationEntity } from './entities/solicitation.entity';
import { UserModule } from '../user/user.module';
import { SectorModule } from 'src/sector/sector.module';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitationEntity]), UserModule, SectorModule],
  controllers: [SolicitationController],
  providers: [SolicitationService],
  exports: [SolicitationService],
})
export class SolicitationModule {}
