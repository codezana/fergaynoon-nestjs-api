import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';
import { ProjectUserAnswer } from 'src/project-user-answer/entities/project-user-answer.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('project_question')
export class ProjectQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  title: string;

  @Column({nullable:true,type:'int'})
  degree: number;

  @ManyToOne(() => ProjectExam, (projectExam) => projectExam.projectQuestions)
  projectExam?: ProjectExam;

  @OneToMany(() => ProjectChoice, projectChoice => projectChoice.projectQuestion, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
  })
  projectChoice: ProjectChoice[];

  @OneToMany(() => ProjectUserAnswer, answer => answer.question)
  userAnswers?: ProjectUserAnswer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
