import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the User', example: 'Sunny' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Role of the User', example: 'USER OR ADMIN' })
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty({
    description: 'Username of the User',
    example: 'sunny.d@saleshandy.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Password of the User' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'Epics that are linked with the User',
    example: '[id: 1, id: 2, ...]',
  })
  @IsOptional()
  @IsArray()
  readonly epicIds?: number[];

  @ApiProperty({
    description: 'Stories that are linked with the User',
    example: '[id: 1, id: 2, ...]',
  })
  @IsOptional()
  @IsArray()
  readonly storyIds?: number[];

  @ApiProperty({
    description: 'Tasks that are linked with the User',
    example: '[id: 1, id: 2, ...]',
  })
  @IsOptional()
  @IsArray()
  readonly taskIds?: number[];
}
