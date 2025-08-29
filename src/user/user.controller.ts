import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAccessTokenGuard } from 'src/guards/jwt-Accesstoken.guard';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  getAll(@Req() req: Request): Promise<User[]> {
    console.log((req as any).user);
    return this.userService.getAllUsers();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.creatUser(createUserDto);
  }
}
