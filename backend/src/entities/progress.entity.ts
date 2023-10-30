import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Question } from './question.entity';
import { Galaxy } from './galaxy.entity';
import { World } from './world.entity';
import { User } from './user.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Question)
  @JoinColumn()
  currentQuestion: Question;

  @OneToOne(() => World)
  @JoinColumn()
  world: World;
}
