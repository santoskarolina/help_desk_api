import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectorEntity } from '../entities/sector.entity';
import { Repository } from 'typeorm';
import { CreateSectorDTo } from '../entities/dto/sector.dto';
import { ErrosEnum } from 'src/models/error.enum';

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

  async findById(id: number): Promise<SectorEntity> {
    const sector = await this.sectorRepository.findOne({
      where: { sector_id: id },
    });

    if (!sector) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: 'Sector not found',
          type: ErrosEnum.ENTITY_NODE_FOUND,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    } else {
      return sector;
    }
  }
}
