import { IsString, IsIn } from 'class-validator';

export class ConvertEntityDto {
  @IsString()
  @IsIn(['epic', 'story'])
  targetType: string;
}
