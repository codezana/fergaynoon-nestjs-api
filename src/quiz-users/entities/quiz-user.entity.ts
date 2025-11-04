import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';

@Entity('quiz_users')
export class QuizUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  ipAddress: string;

  @OneToMany(() => ProjectRegistration, reg => reg.quizUser,{onDelete: 'CASCADE'})
  registrations: ProjectRegistration[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}