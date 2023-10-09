import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { World } from './world.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  answer: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  category: string;

  @ManyToOne(() => World, (world) => world.questions)
  world: World;
}
