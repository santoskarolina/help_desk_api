import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SolutionService } from '../services/solution.service';
import { SolutionCreate } from '../entities/dto/solution.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';

@UseGuards(RoleGuard)
@Controller('solution')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Post()
  create(@Body() body: SolutionCreate, @Request() request) {
    return this.solutionService.create(body, request.user);
  }
}
