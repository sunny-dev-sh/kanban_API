import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-tast.dto/create-tast.dto';
import { UpdateTaskDto } from './dto/update-tast.dto/update-tast.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new Task' })
  @ApiCreatedResponse({ description: 'Task created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Tasks' })
  @ApiOkResponse({ description: 'List of Tasks', isArray: true })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Task by ID' })
  @ApiOkResponse({ description: 'Task found' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a Task by ID' })
  @ApiOkResponse({ description: 'Task deleted' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update a Task by ID' })
  @ApiOkResponse({ description: 'Task updated' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }
}
