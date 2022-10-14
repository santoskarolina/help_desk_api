import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtLocalGuard } from 'src/auth/guards/jwt.guard';
import { CreateSectorDTo } from '../entities/dto/sector.dto';
import { SectorService } from '../services/sector.service';

@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  @UseGuards(JwtLocalGuard)
  create(@Body() sector: CreateSectorDTo) {
    return this.sectorService.create(sector);
  }

  @Get()
  findAll() {
    return this.sectorService.findAll();
  }
}
