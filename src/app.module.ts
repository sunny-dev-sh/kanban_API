import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpicModule } from './epic/epic.module';
import { StoryModule } from './story/story.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EpicModule,
    StoryModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sh@110123',
      database: 'kanban_db',
      autoLoadEntities: true,
      synchronize: true, //disable it in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
