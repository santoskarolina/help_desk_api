import { Test, TestingModule } from '@nestjs/testing';
import { SolicitationService } from './solicitation.service';

describe('SolicitationService', () => {
  let service: SolicitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitationService],
    }).compile();

    service = module.get<SolicitationService>(SolicitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
