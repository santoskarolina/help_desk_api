import { Module } from '@nestjs/common';
import { SectorService } from './services/sector.service';
import { SectorController } from './controller/sector.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SectorEntity} from "./entities/sector.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SectorEntity])],
  controllers: [SectorController],
  providers: [SectorService]
})
export class SectorModule {}
