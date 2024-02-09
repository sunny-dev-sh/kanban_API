import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateEpicDto {
  @ApiProperty({ description: 'Title of the Epic', example: 'Epic Title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Estimation of the Epic', example: '5 days' })
  @IsNotEmpty()
  @IsString()
  readonly estimation: string;

  @ApiProperty({
    description: 'Description of the Epic',
    example: 'Epic Description',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Priority of the Epic', example: 'High/Medium/Low' })
  @IsNotEmpty()
  @IsString()
  readonly priority: string;

  @ApiProperty({
    description: 'Stories that are linked with this Epic',
    example: '[id: 1, id: 2, ...]',
  })
  @IsOptional()
  @IsArray()
  readonly storyIds?: number[];

  @ApiProperty({
    description: 'Tasks that are linked with this Epic',
    example: '[id: 1, id: 2, ...]',
  })
  @IsOptional()
  @IsArray()
  readonly taskIds?: number[];
}
