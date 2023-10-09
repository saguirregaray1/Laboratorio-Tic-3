import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { World } from './world.entity';

@Entity()
export class Galaxy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  index: string;

  @OneToMany(() => World, (world) => world.galaxy)
  worlds: World[];
}
