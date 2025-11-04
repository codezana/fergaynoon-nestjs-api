import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { QuizUser } from 'src/quiz-users/entities/quiz-user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectUserAnswer } from 'src/project-user-answer/entities/project-user-answer.entity';

@Entity('project_registrations')
export class ProjectRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizUser, { eager: true })
  @JoinColumn({ name: 'quizUserId' })
  quizUser: QuizUser;

  @ManyToOne(() => Project, project => project.registrations, { eager: true, onDelete: 'CASCADE', cascade: true, })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(() => ProjectUserAnswer, answer => answer.registration)
  userAnswers?: ProjectUserAnswer[];

  @CreateDateColumn()
  registeredAt: Date;

  @Column({ type: 'int', nullable: true })
  totalScore?: number;

}