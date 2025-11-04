import { Choice } from 'src/questions/entities/choice.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  degree: number;

  @ManyToOne(() => Level, (level) => level.questions)
  level?: Level;

  @OneToMany(() => Choice, choice => choice.question, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
  })
  choices: Choice[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}