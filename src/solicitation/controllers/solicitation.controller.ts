import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { SolicitationService } from '../services/solicitation.service';
import { JwtLocalGuard } from '../../auth/guards/jwt.guard';
import { SolicitationBody } from '../entities/dto/solicitation.dto';

@Controller('solicitation')
@UseGuards(JwtLocalGuard)
export class SolicitationController {
  constructor(private readonly solicitationService: SolicitationService) {}

  @Get()
  async getAll(@Request() request, @Query("status") status: string) {
    return await this.solicitationService.getAll(request.user, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() request) {
    return this.solicitationService.findOne(id, request.user);
  }

  @Post()
  async create(@Body() solicitation: SolicitationBody, @Request() request) {
    return await this.solicitationService.create(solicitation, request.user);
  }

  @Put('resolve-solicitation/:id')
  resolveSolicitation(@Param('id') id: string) {
    return this.solicitationService.resolveSolicitation(id);
  }
}
