import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register and Create a new User' })
  @ApiCreatedResponse({ description: 'User registered and created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return { message: 'User created successfully', user };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with a user credentials' })
  @ApiCreatedResponse({ description: 'User loggedin successfully' })
  @ApiBadRequestResponse({ description: 'Invalid credentials or Bad Request' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a new User' })
  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ description: 'List of Users', isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an User by ID' })
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete an User by ID' })
  @ApiOkResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update an User by ID' })
  @ApiOkResponse({ description: 'User updated' })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
