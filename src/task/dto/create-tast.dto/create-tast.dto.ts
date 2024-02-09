import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the Task', example: 'Task Title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Sprint of the Task', example: 'Sprint 1' })
  @IsNotEmpty()
  @IsString()
  readonly sprint: string;

  @ApiProperty({ description: 'Estimation of the Task', example: '2 days' })
  @IsNotEmpty()
  @IsString()
  readonly estimation: string;

  @ApiProperty({ description: 'Description of the Task', example: 'Task Description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Priority of the Task', example: 'High/Medium/Low' })
  @IsNotEmpty()
  @IsString()
  readonly priority: string;
}
