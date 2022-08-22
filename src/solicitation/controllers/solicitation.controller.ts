import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SolicitationService } from '../services/solicitation.service';
import { SolicitationCreate } from '../entities/dto/solicitation.dto';
import { JwtLocalGuard } from '../../auth/guards/jwt.guard';

@Controller('solicitation')
@UseGuards(JwtLocalGuard)
export class SolicitationController {
  constructor(private readonly solicitationService: SolicitationService) {}

  @Get('open')
  findAllOpen(@Request() request) {
    return this.solicitationService.findAllOpen(request.user);
  }

  @Get('close')
  findAllCLose(@Request() request) {
    return this.solicitationService.findAllClose(request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Request() request) {
    return this.solicitationService.findOne(id, request.user);
  }

  @Post()
  create(@Body() solicitation: SolicitationCreate, @Request() request) {
    return this.solicitationService.create(solicitation, request.user);
  }

  @Put('resolve-solicitation/:id')
  resolveSolicitation(@Param('id') id: number) {
    return this.solicitationService.resolveSolicitation(id);
  }
}
