import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRegistrationService } from './project-registration.service';

describe('ProjectRegistrationService', () => {
  let service: ProjectRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectRegistrationService],
    }).compile();

    service = module.get<ProjectRegistrationService>(ProjectRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
