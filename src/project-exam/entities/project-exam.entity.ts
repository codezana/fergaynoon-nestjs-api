import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('project_exam')
export class ProjectExam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true, type: 'int' })
  total_degree: number;

  @Column({ type: 'boolean', default: true, nullable: true })
  isActive: boolean;

  @ManyToOne(() => Project, (project) => project.projectExam)
  project?: Project;

  @OneToMany(() => ProjectQuestion, (projectQuestion) => projectQuestion.projectExam)
  projectQuestions?: ProjectQuestion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
