import { Module } from '@nestjs/common';
import { SolutionService } from './services/solution.service';
import { SolutionController } from './controllers/solution.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SolutionEntity} from "./entities/solution.entity";
import {SolicitationModule} from "../solicitation/solicitation.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([SolutionEntity]), SolicitationModule, UserModule],
  controllers: [SolutionController],
  providers: [SolutionService],
})
export class SolutionModule {}
