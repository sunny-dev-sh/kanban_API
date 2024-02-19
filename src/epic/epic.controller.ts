import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { EpicService } from './epic.service';
import { CreateEpicDto } from './dto/create-epic.dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto/update-epic.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@Controller('epic')
@ApiTags('epic')
export class EpicController {
  constructor(private readonly epicService: EpicService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create a new Epic' })
  @ApiCreatedResponse({ description: 'Epic created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createEpicDto: CreateEpicDto) {
    return this.epicService.create(createEpicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Epics' })
  @ApiOkResponse({ description: 'List of Epics', isArray: true })
  findAll() {
    return this.epicService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Epic by ID' })
  @ApiOkResponse({ description: 'Epic found' })
  @ApiNotFoundResponse({ description: 'Epic not found' })
  findOne(@Param('id') id: number) {
    return this.epicService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete an Epic by ID' })
  @ApiOkResponse({ description: 'Epic deleted' })
  @ApiNotFoundResponse({ description: 'Epic not found' })
  remove(@Param('id') id: number) {
    return this.epicService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update an Epic by ID' })
  @ApiOkResponse({ description: 'Epic updated' })
  @ApiNotFoundResponse({ description: 'Epic not found' })
  update(@Param('id') id: number, @Body() updateEpicDto: UpdateEpicDto) {
    return this.epicService.update(id, updateEpicDto);
  }
}
