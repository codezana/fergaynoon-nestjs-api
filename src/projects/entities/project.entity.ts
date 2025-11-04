import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  isActive: boolean;

  @OneToMany(() => ProjectRegistration, reg => reg.project)
  registrations: ProjectRegistration[];

  @OneToMany(() => ProjectExam, (projectExam) => projectExam.project)
  projectExam?: ProjectExam[];

  @Column({ nullable: true }) // Image is optional
  imagePath: string; // This will store the path to the uploaded image

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
