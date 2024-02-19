import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
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
}