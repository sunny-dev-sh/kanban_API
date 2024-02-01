import { Epic } from 'src/epic/entities/epic';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  estimation: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  @ManyToOne(() => Epic, (epic) => epic.stories)
  epic: Epic;
}
