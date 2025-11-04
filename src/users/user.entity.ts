// users/user.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  password: string; // not exposed to GraphQL

  @Column({ default: 'user' })
  @Field()
  role: string; // e.g., 'user' or 'admin'
}

// ✅ User database schema with role.