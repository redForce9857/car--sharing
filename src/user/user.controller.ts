import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserResponseInterface} from "./types/userResponse.interface";
import {LoginUserDto} from "./dto/login-user.dto";
import {User} from "./decorators/user.decorator";
import {UserEntity} from "./entities/user.entity";
import {AuthGuard} from "./guards/auth.guards";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async create(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface>{
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user)
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface>{
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user)
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface>{
    return this.userService.buildUserResponse(user)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch('user')
  @UseGuards(AuthGuard)
  async update(@User('id') idOfCurrentUser: number, @Body('user') updateUserDto: UpdateUserDto): Promise<UserResponseInterface>{
   const user = await this.userService.update(idOfCurrentUser, updateUserDto);
   return this.userService.buildUserResponse(user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
