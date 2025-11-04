import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectUserAnswer } from 'src/project-user-answer/entities/project-user-answer.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('project_choice')
export class ProjectChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  choiceKey?: string;
  
  @Column({ nullable: true, type: 'text' })
  choiceText?: string;
  
  @Column({ default: false })
  isCorrect: boolean;
  

  @ManyToOne(() => ProjectQuestion, question => question.projectChoice, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'projectQuestionId' })
  projectQuestion?: ProjectQuestion;

  @OneToMany(() => ProjectUserAnswer, answer => answer.selectedChoice)
  userAnswers?: ProjectUserAnswer[]; 
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
