import { Module } from '@nestjs/common';
import { EpicController } from './epic.controller';
import { EpicService } from './epic.service';
import { Epic } from './entities/epic';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Epic])],
  controllers: [EpicController],
  providers: [EpicService],
})
export class EpicModule {}
