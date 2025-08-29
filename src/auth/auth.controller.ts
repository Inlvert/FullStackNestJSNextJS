import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtRefreshTokenGuard } from 'src/guards/jwt-Refreshtoken.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registrationUser(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.loginUser(createUserDto);
  }

  // @UseGuards(JwtRefreshTokenGuard)
  // @Post('refresh')
  // refresh(@Body('tokenInstants') tokenInstants: string) {
  //   return this.authService.refreshUser(tokenInstants);
  // }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  refresh(@Req() req) {
    return this.authService.refreshUser(req['tokenInstants']);
  }
}
