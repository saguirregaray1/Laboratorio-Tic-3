import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TriviaQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false })
  body: string;

  @Column({ nullable: false })
  answer: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  option1: string;

  @Column({ nullable: false })
  option2: string;

  @Column({ nullable: false })
  option3: string;

  @Column({ nullable: false })
  option4: string;

  @Column({ nullable: false })
  universe: string;

  @Column({ nullable: false })
  world: string;
}
