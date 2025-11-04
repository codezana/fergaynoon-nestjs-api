import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { SocialMedia } from './social-media.entity';

@Entity({ name: 'about' })
export class About {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  description: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => SocialMedia, (socialMedia) => socialMedia.about)
  social: SocialMedia[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
