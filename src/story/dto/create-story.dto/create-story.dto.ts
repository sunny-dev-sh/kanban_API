import { IsString } from "class-validator";

export class CreateStoryDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly estimation: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly priority: string;
}
