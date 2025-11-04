import { Question } from 'src/questions/entities/question.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'choices' })
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  choiceKey: string;

  @Column('text')
  choiceText: string;

  @Column({ default: false })
  isCorrect: boolean;

  @ManyToOne(() => Question, question => question.choices, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'questionId' })
  question?: Question;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
