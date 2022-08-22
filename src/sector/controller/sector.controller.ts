import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SectorService } from '../services/sector.service';
import { SectorCreate } from '../entities/dto/sector.dto';
import { JwtLocalGuard } from '../../auth/guards/jwt.guard';

@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  @UseGuards(JwtLocalGuard)
  create(@Body() sector: SectorCreate) {
    return this.sectorService.create(sector);
  }

  @Get()
  findAll() {
    return this.sectorService.findAll();
  }
}
