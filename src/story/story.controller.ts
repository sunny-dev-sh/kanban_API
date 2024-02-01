import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto/update-story.dto';
import { ConvertEntityDto } from 'src/common/dto/convert-entity/convert-entity';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('/create')
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @Get()
  findAll() {
    return this.storyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.storyService.findOne(id);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.storyService.remove(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(id, updateStoryDto);
  }

  @Patch('/convert-to-epic/:id')
  convert(@Param('id') id: number, @Body() convertDto: ConvertEntityDto) {
    return this.storyService.convert(id, convertDto);
  }
}
