import { Part } from 'src/part/entities/part.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'levels' })
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  level_key: number;


  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Part, (part) => part.levels)
  part?: Part;
  
  @OneToMany(() => Question, (question) => question.level)
  questions?: Question[];
  
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
