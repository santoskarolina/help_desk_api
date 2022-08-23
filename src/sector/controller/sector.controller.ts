import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSectorDTo } from '../entities/dto/sector.dto';
import { SectorService } from '../services/sector.service';

@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  create(@Body() sector: CreateSectorDTo) {
    return this.sectorService.create(sector);
  }

  @Get()
  findAll() {
    return this.sectorService.findAll();
  }
}
