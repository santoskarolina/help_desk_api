import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SolutionCreate } from "../entities/dto/solution.dto";
import { UserLogin } from "../../user/entities/dto/user.dto";
import { UserService } from "../../user/services/user.service";
import { SolutionEntity } from '../entities/solution.entity';

@Injectable()
export class SolutionService {

    constructor(
        @InjectRepository(SolutionEntity)
        private readonly solutionRepository: Repository<SolutionEntity>,
        private readonly userService: UserService
    ) { }

    async create(body: SolutionCreate, user: UserLogin) {
        body.user = await this.userService.findByEmail(user.email);
        const solution = await this.solutionRepository.save(body);
        return solution;
    }
}
