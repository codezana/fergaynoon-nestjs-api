import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';

@Entity('project_user_answers')
export class ProjectUserAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProjectRegistration, registration => registration.userAnswers, { onDelete: 'CASCADE' })
    registration: ProjectRegistration;

    @ManyToOne(() => ProjectQuestion, question => question.userAnswers, { onDelete: 'CASCADE' })
    question: ProjectQuestion;

    @ManyToOne(() => ProjectChoice, choice => choice.userAnswers, { onDelete: 'CASCADE' })
    selectedChoice: ProjectChoice;

    @CreateDateColumn()
    answeredAt: Date;

    // ✅ Computed Field — not stored in DB
    @Column({ nullable: true })
    isCorrect: boolean;
}
