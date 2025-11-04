import { Test, TestingModule } from '@nestjs/testing';
import { QuizUsersController } from './quiz-users.controller';
import { QuizUsersService } from './quiz-users.service';

describe('QuizUsersController', () => {
  let controller: QuizUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizUsersController],
      providers: [QuizUsersService],
    }).compile();

    controller = module.get<QuizUsersController>(QuizUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
