import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Theorem } from './theorem.entity';

@Entity()
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    default: 'user',
  })
  role: string;

  @Column({
    nullable: false,
  })
  course: string;

  @Column({
    nullable: false,
    default: 3,
  })
  lives: number;

  @ManyToMany(() => Theorem)
  @JoinTable()
  book: Theorem[];
}
