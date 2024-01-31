import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story';
import { Repository } from 'typeorm';
import { CreateStoryDto } from './dto/create-story.dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto/update-story.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}

  async create(createStoryDto: CreateStoryDto): Promise<Story> {
    const story = this.storyRepository.create(createStoryDto);
    return this.storyRepository.save(story);
  }

  async findAll(): Promise<Story[]> {
    return this.storyRepository.find();
  }

  async findOne(id: number) {
    const story = await this.storyRepository.findOne({
      where: { id: id },
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
    return this.storyRepository.save(story);
  }
}
