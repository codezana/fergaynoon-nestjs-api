import { Test, TestingModule } from '@nestjs/testing';
import { ProjectExamService } from './project-exam.service';

describe('ProjectExamService', () => {
  let service: ProjectExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectExamService],
    }).compile();

    service = module.get<ProjectExamService>(ProjectExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
