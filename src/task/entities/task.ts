import { Epic } from 'src/epic/entities/epic';
import { Story } from 'src/story/entities/story';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  sprint: string;

  @Column()
  estimation: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  @ManyToOne(() => Epic, (epic) => epic.tasks)
  epic: Epic;

  @ManyToOne(() => Story, (story) => story.tasks)
  stories: Story[];
}
