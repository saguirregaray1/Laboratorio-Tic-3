import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Generated,
  BeforeInsert,
} from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { OneToOne, JoinColumn } from 'typeorm';
import { Galaxy } from './galaxy.entity';
import { TriviaQuestion } from './trivia_question.entity';

@Entity()
export class Duel {
  @PrimaryGeneratedColumn({ name: 'id' })
  _id: string;

  @Column({ name: 'duelId', unique: true, length: 6 })
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  players: User[];

  @ManyToMany(() => TriviaQuestion)
  @JoinTable()
  questions: TriviaQuestion[];

  @Column({ nullable: false })
  rounds: number;

  @ManyToOne(() => Galaxy)
  @JoinColumn()
  galaxy: Galaxy;

  @Column({ nullable: false, default: 0 })
  currentRound: number;

  @Column({ type: 'json', nullable: true })
  playerScores: { [key: string]: number };

  @Column({ nullable: true })
  winner: string;

  // Define a custom ID generator function
  @BeforeInsert()
  generateId() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.id = id;
  }
}
