import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { Epic } from 'src/epic/entities/epic';
import { Story } from 'src/story/entities/story';
import { Task } from 'src/task/entities/task';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Epic)
    private readonly epicRepository: Repository<Epic>,
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.role = createUserDto.role;
    user.username = createUserDto.username;
    user.password = createUserDto.password;

    // Link existing Epic
    if (createUserDto.epicIds && createUserDto.epicIds.length > 0) {
      const epics = await this.epicRepository.findByIds(createUserDto.epicIds);
      if (!epics || epics.length !== createUserDto.epicIds.length) {
        throw new NotFoundException('One or more epics not found');
      }
      user.epics = epics;
    }

    // Link existing Story
    if (createUserDto.storyIds && createUserDto.storyIds.length > 0) {
      const stories = await this.storyRepository.findByIds(
        createUserDto.storyIds,
      );
      if (!stories || stories.length !== createUserDto.storyIds.length) {
        throw new NotFoundException('One or more stories not found');
      }
      user.stories = stories;
    }

    // Link existing Task
    if (createUserDto.taskIds && createUserDto.taskIds.length > 0) {
      const tasks = await this.taskRepository.findByIds(createUserDto.taskIds);
      if (!tasks || tasks.length !== createUserDto.taskIds.length) {
        throw new NotFoundException('One or more tasks not found');
      }
      user.tasks = tasks;
    }

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        epics: true,
        stories: true,
        tasks: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        epics: true,
        stories: true,
        tasks: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    // Set the linked epics based on provided Story IDs
    if (updateUserDto.epicIds) {
      const epics = await this.epicRepository.findByIds(
        updateUserDto.epicIds,
      );
      user.epics = epics;
    }

    // Set the linked stories based on provided Task IDs
    if (updateUserDto.storyIds) {
      const stories = await this.storyRepository.findByIds(
        updateUserDto.storyIds,
      );
      user.stories = stories;
    }

    // Set the linked tasks based on provided Task IDs
    if (updateUserDto.taskIds) {
      const tasks = await this.taskRepository.findByIds(
        updateUserDto.taskIds,
      );
      user.tasks = tasks;
    }

    return this.userRepository.save(user);
  }
}
