import { Test, TestingModule } from '@nestjs/testing';
import { ProjectQuestionService } from './project-question.service';

describe('ProjectQuestionService', () => {
  let service: ProjectQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectQuestionService],
    }).compile();

    service = module.get<ProjectQuestionService>(ProjectQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
