import { Body, Controller, Get, Post } from '@nestjs/common';
import { SectorService } from '../services/sector.service';
import { SectorCreate } from '../entities/dto/sector.dto';

@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  create(@Body() sector: SectorCreate) {
    return this.sectorService.create(sector);
  }

  @Get()
  findAll() {
    return this.sectorService.findAll();
  }
}
