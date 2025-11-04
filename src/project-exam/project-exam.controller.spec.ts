import { Test, TestingModule } from '@nestjs/testing';
import { ProjectExamController } from './project-exam.controller';
import { ProjectExamService } from './project-exam.service';

describe('ProjectExamController', () => {
  let controller: ProjectExamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectExamController],
      providers: [ProjectExamService],
    }).compile();

    controller = module.get<ProjectExamController>(ProjectExamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
