import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { Story } from './entities/story';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epic } from 'src/epic/entities/epic';
import { Task } from 'src/task/entities/task';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Epic, Task])],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule {}
