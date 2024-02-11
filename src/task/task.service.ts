import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-tast.dto/create-tast.dto';
import { UpdateTaskDto } from './dto/update-tast.dto/update-tast.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: {
        user: true,
        epic: true,
        stories: true,
      }
    });
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        epic: true,
        stories: true,
      }
    });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    return this.taskRepository.remove(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
    });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return this.taskRepository.save(task);
  }
}
