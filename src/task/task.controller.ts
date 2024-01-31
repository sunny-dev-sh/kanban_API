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
  
  @Controller('task')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post('/create')
    create(@Body() createTaskDto: CreateTaskDto) {
      return this.taskService.create(createTaskDto);
    }
  
    @Get()
    findAll() {
      return this.taskService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.taskService.findOne(id);
    }
  
    @Delete('/delete/:id')
    remove(@Param('id') id: number) {
      return this.taskService.remove(id);
    }
  
    @Patch('/update/:id')
    update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
      return this.taskService.update(id, updateTaskDto);
    }
  }
  