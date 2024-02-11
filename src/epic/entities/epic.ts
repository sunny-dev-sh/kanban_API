import { Story } from 'src/story/entities/story';
import { Task } from 'src/task/entities/task';
import { User } from 'src/users/entities/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.epics)
  user: User[];

  @OneToMany(() => Story, (story) => story.epic)
  stories: Story[];

  @OneToMany(() => Task, (task) => task.epic, { cascade: true })
  tasks: Task[];
}
