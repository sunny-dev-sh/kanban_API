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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('story')
@ApiTags('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new Story' })
  @ApiCreatedResponse({ description: 'Story created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Stories' })
  @ApiOkResponse({ description: 'List of Stories', isArray: true })
  findAll() {
    return this.storyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Story by ID' })
  @ApiOkResponse({ description: 'Story found' })
  @ApiNotFoundResponse({ description: 'Story not found' })
  findOne(@Param('id') id: number) {
    return this.storyService.findOne(id);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a Story by ID' })
  @ApiOkResponse({ description: 'Story deleted' })
  @ApiNotFoundResponse({ description: 'Story not found' })
  remove(@Param('id') id: number) {
    return this.storyService.remove(id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update a Story by ID' })
  @ApiOkResponse({ description: 'Story updated' })
  @ApiNotFoundResponse({ description: 'Story not found' })
  update(@Param('id') id: number, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(id, updateStoryDto);
  }
}
