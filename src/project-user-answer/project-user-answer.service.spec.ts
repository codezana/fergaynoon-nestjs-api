import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUserAnswerService } from './project-user-answer.service';

describe('ProjectUserAnswerService', () => {
  let service: ProjectUserAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectUserAnswerService],
    }).compile();

    service = module.get<ProjectUserAnswerService>(ProjectUserAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
