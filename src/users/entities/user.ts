import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Epic } from 'src/epic/entities/epic';
import { Story } from 'src/story/entities/story';
import { Task } from 'src/task/entities/task';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column()
  role: string;

  @Column({ unique: true, nullable: false, length: 50 })
  username: string;

  @Column({ nullable: false, length: 255 })
  password: string;

  @OneToMany(() => Epic, (epic) => epic.user, {cascade: true})
  epics: Epic[];

  @OneToMany(() => Story, (story) => story.user, {cascade: true})
  stories: Story[];

  @OneToMany(() => Task, (task) => task.user, {cascade: true})
  tasks: Task[];
}
