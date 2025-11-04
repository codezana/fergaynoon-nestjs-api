import { Test, TestingModule } from '@nestjs/testing';
import { QuizUsersService } from './quiz-users.service';

describe('QuizUsersService', () => {
  let service: QuizUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizUsersService],
    }).compile();

    service = module.get<QuizUsersService>(QuizUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
