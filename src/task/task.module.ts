import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epic } from 'src/epic/entities/epic';
import { Story } from 'src/story/entities/story';
import { User } from 'src/users/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Epic, Story, User])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
