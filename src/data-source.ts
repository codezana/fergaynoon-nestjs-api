import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { About } from './about/entities/about.entity';
import { SocialMedia } from './about/entities/social-media.entity';
import { Level } from './levels/entities/level.entity';
import { Part } from './part/entities/part.entity';
import { ProjectExam } from './project-exam/entities/project-exam.entity';
import { ProjectQuestion } from './project-question/entities/project-question.entity';
import { ProjectChoice } from './project-question/entities/project-choice.entity';
import { ProjectRegistration } from './project-registration/entities/project-registration.entity';
import { ProjectUserAnswer } from './project-user-answer/entities/project-user-answer.entity';
import { Project } from './projects/entities/project.entity';
import { Question } from './questions/entities/question.entity';
import { Choice } from './questions/entities/choice.entity';
import { QuizUser } from './quiz-users/entities/quiz-user.entity';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    About,
    SocialMedia,
    Level,
    Part,
    ProjectExam,
    ProjectQuestion,
    ProjectChoice,
    ProjectRegistration,
    ProjectUserAnswer,
    Project,
    Question,
    Choice,
    QuizUser,
    User,
  ],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  ssl:{ rejectUnauthorized: false },
  logging: false,
  subscribers: [],
});
