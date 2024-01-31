import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { EpicService } from './epic.service';
import { CreateEpicDto } from './dto/create-epic.dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto/update-epic.dto';

@Controller('epic')
export class EpicController {
  constructor(private readonly epicService: EpicService) {}

  @Post('/create')
  create(@Body() createEpicDto: CreateEpicDto) {
    return this.epicService.create(createEpicDto);
  }

  @Get()
  findAll() {
    return this.epicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.epicService.findOne(id);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.epicService.remove(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateEpicDto: UpdateEpicDto) {
    return this.epicService.update(id, updateEpicDto);
  }
}
