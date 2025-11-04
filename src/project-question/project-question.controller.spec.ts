import { Test, TestingModule } from '@nestjs/testing';
import { ProjectQuestionController } from './project-question.controller';
import { ProjectQuestionService } from './project-question.service';

describe('ProjectQuestionController', () => {
  let controller: ProjectQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectQuestionController],
      providers: [ProjectQuestionService],
    }).compile();

    controller = module.get<ProjectQuestionController>(ProjectQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
