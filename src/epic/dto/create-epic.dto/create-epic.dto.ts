import { IsString } from "class-validator";

export class CreateEpicDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly estimation: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly priority: string;
}
