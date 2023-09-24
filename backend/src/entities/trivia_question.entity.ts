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
}
