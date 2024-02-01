import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly sprint: string;

  @IsNotEmpty()
  @IsString()
  readonly estimation: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly priority: string;
  
}
