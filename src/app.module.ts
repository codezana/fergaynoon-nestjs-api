import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelsModule } from './levels/levels.module';
import { ProjectRegistrationModule } from './project-registration/project-registration.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { PartModule } from './part/part.module';
import { ProjectExamModule } from './project-exam/project-exam.module';
import { ProjectQuestionModule } from './project-question/project-question.module';
import { ProjectUserAnswerModule } from './project-user-answer/project-user-answer.module';
import { ProjectsModule } from './projects/projects.module';
import { QuestionsModule } from './questions/questions.module';
import { QuizUsersModule } from './quiz-users/quiz-users.module';
import { AboutModule } from './about/about.module';
import { SocialMediaModule } from './about/social-media.module';

@Module({
  imports: [

    
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Load .env globally

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize:config.get('DB_SYNC') === 'true',
        ssl:{
          rejectUnauthorized: false,
        }
      }),
    }),
    
    LevelsModule,
    AuthModule,
    UsersModule,
    ProjectRegistrationModule,
    PartModule,
    ProjectExamModule,
    ProjectQuestionModule,
    ProjectUserAnswerModule,
    ProjectsModule,
    QuestionsModule,
    QuizUsersModule,
    AboutModule,
    SocialMediaModule

  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule { }
