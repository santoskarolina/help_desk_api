import { Test, TestingModule } from '@nestjs/testing';
import { SolicitationController } from './solicitation.controller';
import { SolicitationService } from '../services/solicitation.service';

describe('SolicitationController', () => {
  let controller: SolicitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitationController],
      providers: [SolicitationService],
    }).compile();

    controller = module.get<SolicitationController>(SolicitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
