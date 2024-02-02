import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Epic } from './entities/epic';
import { Repository } from 'typeorm';
import { CreateEpicDto } from './dto/create-epic.dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto/update-epic.dto';
import { Story } from 'src/story/entities/story';
import { Task } from 'src/task/entities/task';

@Injectable()
export class EpicService {
  constructor(
    @InjectRepository(Epic)
    private readonly epicRepository: Repository<Epic>,
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createEpicDto: CreateEpicDto): Promise<Epic> {
    const epic = new Epic();
    epic.title = createEpicDto.title;
    epic.estimation = createEpicDto.estimation;
    epic.description = createEpicDto.description;
    epic.priority = createEpicDto.priority;

    // Link existing stories
    if (createEpicDto.storyIds && createEpicDto.storyIds.length > 0) {
      const stories = await this.storyRepository.findByIds(
        createEpicDto.storyIds,
      );
      if (!stories || stories.length !== createEpicDto.storyIds.length) {
        throw new NotFoundException('One or more stories not found');
      }
      epic.stories = stories;
    }

    // Link existing tasks
    if (createEpicDto.taskIds && createEpicDto.taskIds.length > 0) {
      const tasks = await this.taskRepository.findByIds(createEpicDto.taskIds);
      if (!tasks || tasks.length !== createEpicDto.taskIds.length) {
        throw new NotFoundException('One or more tasks not found');
      }
      epic.tasks = tasks;
    }

    return this.epicRepository.save(epic);
  }

  async findAll(): Promise<Epic[]> {
    return this.epicRepository.find({
      relations: {
        stories: true,
        tasks: true,
      },
    });
  }

  async findOne(id: number) {
    const epic = await this.epicRepository.findOne({
      where: { id: id },
      relations: {
        stories: true,
        tasks: true,
      },
    });
    if (!epic) {
      throw new NotFoundException(`Epic #${id} not found`);
    }
    return epic;
  }

  async remove(id: number) {
    const epic = await this.findOne(id);
    return this.epicRepository.remove(epic);
  }

  async update(id: number, updateEpicDto: UpdateEpicDto) {
    const epic = await this.epicRepository.preload({
      id: id,
      ...updateEpicDto,
    });
    if (!epic) {
      throw new NotFoundException(`Epic #${id} not found`);
    }

    // Set the linked stories based on provided Story IDs
    if (updateEpicDto.storyIds) {
      const stories = await this.storyRepository.findByIds(
        updateEpicDto.storyIds,
      );
      epic.stories = stories;
    }

    // Set the linked tasks based on provided Task IDs
    if (updateEpicDto.taskIds) {
      const tasks = await this.taskRepository.findByIds(updateEpicDto.taskIds);
      epic.tasks = tasks;
    }

    return this.epicRepository.save(epic);
  }
}
