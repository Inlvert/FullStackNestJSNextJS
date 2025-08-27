import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  create(@Body() cretaUserDto: CreateUserDto): Promise<User> {
    return this.userService.creatUser(cretaUserDto);
  }
}
