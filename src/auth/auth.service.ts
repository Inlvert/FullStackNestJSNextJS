import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User, UserDocument } from 'src/user/schema/user.schema';
// import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import {
  RefreshToken,
  refreshTokenDocument,
} from './model/refreshToken.schema';
import { AuthResponse } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<refreshTokenDocument>,
    private jwtService: JwtService,
  ) {}

  async registrationUser(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.userModel.create(createUserDto);

    const tokenPayload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      secret: 'rftgyhujiok',
      expiresIn: '5min',
    });
    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      secret: 'fghiuHIYGUI',
      expiresIn: '7d',
    });

    await this.refreshTokenModel.create({
      token: refreshToken,
      userId: user._id,
    });

    return {
      user,
      tokenPair: {
        accessToken,
        refreshToken,
      },
    };
  }
}
