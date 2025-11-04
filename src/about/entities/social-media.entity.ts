import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { About } from './about.entity';

@Entity({ name: 'social_media' })
export class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;  // Icon name or URL

  @Column()
  url: string;  // The URL of the social media profile

  @ManyToOne(() => About, (about) => about.social)
  about?: About;  // Relation to the About entity
}
