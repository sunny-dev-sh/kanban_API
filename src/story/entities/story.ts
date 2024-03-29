import { Epic } from 'src/epic/entities/epic';
import { Task } from 'src/task/entities/task';
import { User } from 'src/users/entities/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(() => Task, (task) => task.stories)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.stories)
  user: User;
}
