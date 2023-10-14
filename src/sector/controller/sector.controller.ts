import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateSectorDTo } from '../entities/dto/sector.dto';
import { SectorService } from '../services/sector.service';

@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  // @UseGuards(JwtLocalGuard)
  create(@Body() sector: CreateSectorDTo) {
    return this.sectorService.create(sector);
  }

  @Get()
  findAll() {
    return this.sectorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectorService.findById(id);
  }
}
