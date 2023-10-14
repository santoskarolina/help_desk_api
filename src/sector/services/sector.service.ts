import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorEntity } from '../entities/sector.entity';
import { Repository } from 'typeorm';
import { CreateSectorDTo } from '../entities/dto/sector.dto';
import { ErrosEnum } from 'src/models/error.enum';
import {CustomHttpException} from 'src/@utils/customExeception';
@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly sectorRepository: Repository<SectorEntity>,
  ) {}

  async create(body: CreateSectorDTo): Promise<SectorEntity> {
    return await this.sectorRepository.save(body);
  }

  async findAll() {
    const sectors = await this.sectorRepository.find();
    return { sectors: sectors, totalSize: sectors.length };
  }

  async findById(id: string): Promise<SectorEntity> {
    const sector = await this.sectorRepository.findOne({ where : {id}});
    if (!sector) throw new CustomHttpException(HttpStatus.PRECONDITION_FAILED, 'Sector not found', ErrosEnum.ENTITY_NODE_FOUND);
    return sector;
  }
}
