import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRegistrationController } from './project-registration.controller';
import { ProjectRegistrationService } from './project-registration.service';

describe('ProjectRegistrationController', () => {
  let controller: ProjectRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectRegistrationController],
      providers: [ProjectRegistrationService],
    }).compile();

    controller = module.get<ProjectRegistrationController>(ProjectRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
