import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story';
import { Repository } from 'typeorm';
import { CreateStoryDto } from './dto/create-story.dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto/update-story.dto';
import { Epic } from 'src/epic/entities/epic';
import { Task } from 'src/task/entities/task';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @InjectRepository(Epic)
    private readonly epicRepository: Repository<Epic>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createStoryDto: CreateStoryDto): Promise<Story> {
    const story = new Story();
    story.title = createStoryDto.title;
    story.estimation = createStoryDto.estimation;
    story.description = createStoryDto.description;
    story.priority = createStoryDto.priority;

    //Link existing tasks
    if(createStoryDto.taskIds && createStoryDto.taskIds.length > 0){
      const tasks = await this.taskRepository.findByIds(createStoryDto.taskIds);
      if (!tasks || tasks.length !== createStoryDto.taskIds.length) {
        throw new NotFoundException('One or more tasks not found');
      }
      story.tasks = tasks;
    }

    return this.storyRepository.save(story);
  }

  async findAll(): Promise<Story[]> {
    return this.storyRepository.find({
      relations: {
        epic:true,
        tasks: true,
      }
    });
  }

  async findOne(id: number) {
    const story = await this.storyRepository.findOne({
      where: { id: id },
      relations: {
        epic:true,
        tasks:true,
      }
    });
    if (!story) {
      throw new NotFoundException(`Story #${id} not found`);
    }
    return story;
  }

  async remove(id: number) {
    const story = await this.findOne(id);
    return this.storyRepository.remove(story);
  }

  async update(id: number, UpdateStoryDto: UpdateStoryDto) {
    const story = await this.storyRepository.preload({
      id: id,
      ...UpdateStoryDto,
    });
    if (!story) {
      throw new NotFoundException(`Story #${id} not found`);
    }

    // Set the linked tasks based on provided Task IDs
    if (UpdateStoryDto.taskIds) {
      const tasks = await this.taskRepository.findByIds(UpdateStoryDto.taskIds);
      story.tasks = tasks;
    }

    return this.storyRepository.save(story);
  }
}
