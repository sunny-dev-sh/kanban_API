import { IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly sprint: string;

  @IsString()
  readonly estimation: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly priority: string;
}
