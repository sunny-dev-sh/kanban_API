import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStoryDto {
  @ApiProperty({ description: 'Title of the Story', example: 'Epic Title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Estimation of the Story', example: '3 days' })
  @IsNotEmpty()
  @IsString()
  readonly estimation: string;

  @ApiProperty({ description: 'Description of the Story', example: 'Story Description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Priority of the Story', example: 'High/Medium/Low' })
  @IsNotEmpty()
  @IsString()
  readonly priority: string;

  @ApiProperty({ description: 'Tasks that are linked with this Story', example: '[id: 1, id: 2, ...]' })
  @IsOptional()
  @IsArray()
  readonly taskIds?: number[]
}
