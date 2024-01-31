import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Epic } from './entities/epic';
import { Repository } from 'typeorm';
import { CreateEpicDto } from './dto/create-epic.dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto/update-epic.dto';

@Injectable()
export class EpicService {
  constructor(
    @InjectRepository(Epic)
    private readonly epicRepository: Repository<Epic>,
  ) {}

  async create(createEpicDto: CreateEpicDto): Promise<Epic> {
    const epic = this.epicRepository.create(createEpicDto);
    return this.epicRepository.save(epic);
  }

  async findAll(): Promise<Epic[]> {
    return this.epicRepository.find();
  }

  async findOne(id: number) {
    const epic = await this.epicRepository.findOne({
      where: { id: id },
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
    return this.epicRepository.save(epic);
  }
}
