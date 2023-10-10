import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Duel {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @Column({
    nullable: true,
  })
  @ManyToMany(() => User)
  @JoinTable()
  players: User[];

  @OneToMany(() => Question, (question) => question.world)
  questions: Question[];

  @Column({ nullable: false })
  rounds: number;

  @Column({ nullable: false, default: 0 })
  currentRound: number;

  @Column({ type: 'json', nullable: true })
  playerScores: { [key: number]: number };

  @Column({ nullable: true })
  winner: number;
}
