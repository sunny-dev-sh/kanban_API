import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epic } from 'src/epic/entities/epic';
import { Story } from 'src/story/entities/story';
import { Task } from 'src/task/entities/task';
import { User } from './entities/user';
import { UserService } from './user.service';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Epic, Story, Task])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
