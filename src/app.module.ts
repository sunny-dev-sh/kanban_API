import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpicModule } from './epic/epic.module';
import { StoryModule } from './story/story.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [EpicModule, StoryModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
