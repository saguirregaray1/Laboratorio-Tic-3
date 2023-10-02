import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Question } from './question.entity';
import { Galaxy } from './galaxy.entity';

@Entity()
export class World {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  index: string;

  @OneToMany(() => Question, (question) => question.world)
  questions: Question[];

  @ManyToOne(() => Galaxy, (galaxy) => galaxy.worlds)
  galaxy: Galaxy;
}
