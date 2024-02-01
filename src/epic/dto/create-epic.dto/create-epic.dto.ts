import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateEpicDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly estimation: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly priority: string;

  @IsOptional()
  @IsArray()
  readonly storyIds?: number[];

  @IsOptional()
  @IsArray()
  readonly taskIds?: number[];
}
