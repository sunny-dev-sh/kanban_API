import { Module } from '@nestjs/common';
import { EpicController } from './epic.controller';
import { EpicService } from './epic.service';
import { Epic } from './entities/epic';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from 'src/story/entities/story';
import { Task } from 'src/task/entities/task';

@Module({
  imports: [TypeOrmModule.forFeature([Epic, Story, Task])],
  controllers: [EpicController],
  providers: [EpicService],
})
export class EpicModule {}
