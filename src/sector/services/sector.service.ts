import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SectorEntity} from "../entities/sector.entity";
import {Repository} from "typeorm";
import {SectorCreate} from "../entities/dto/sector.dto";

@Injectable()
export class SectorService {

    constructor(
        @InjectRepository(SectorEntity)
        private readonly  sectorRepository: Repository<SectorEntity>
    ) { }

    async create(body: SectorCreate): Promise<SectorEntity> {
        return await this.sectorRepository.save(body)
    }

    async findAll(){
        const sectors = await this.sectorRepository.find()
        return {sectors: sectors, totalSize: sectors.length}
    }
}
