import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Question } from './question.entity';
import { Galaxy } from './galaxy.entity';
import { World } from './world.entity';
import { User } from './user.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Question)
  @JoinColumn()
  currentQuestion: Question;

  @ManyToOne(() => World)
  @JoinColumn()
  world: World;

  @Column({ nullable: false, default: 0 })
  currentLevel: number;
}
