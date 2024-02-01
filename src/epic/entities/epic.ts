import { Story } from 'src/story/entities/story';
import { Task } from 'src/task/entities/task';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Epic {
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

  @Column({default: 'epic'})
  type: string;
  
  @OneToMany(() => Story, (story) => story.epic)
  stories: Story[];

  @OneToMany(() => Task, (task) => task.epic, { cascade: true })
  tasks: Task[];
}
