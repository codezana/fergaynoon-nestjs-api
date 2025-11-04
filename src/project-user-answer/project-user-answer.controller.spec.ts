import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUserAnswerController } from './project-user-answer.controller';
import { ProjectUserAnswerService } from './project-user-answer.service';

describe('ProjectUserAnswerController', () => {
  let controller: ProjectUserAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectUserAnswerController],
      providers: [ProjectUserAnswerService],
    }).compile();

    controller = module.get<ProjectUserAnswerController>(ProjectUserAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
