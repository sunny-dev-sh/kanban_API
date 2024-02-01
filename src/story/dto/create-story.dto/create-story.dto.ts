import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStoryDto {
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
  readonly taskIds?: number[]
}
