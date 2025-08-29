import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import {
  RefreshToken,
  refreshTokenDocument,
} from 'src/auth/model/refreshToken.schema';
import { Model } from 'mongoose';
import { AuthResponse } from 'src/auth/dto/auth-response.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<refreshTokenDocument>,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async createSession(user: UserDocument) {
    const tokenPayload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const tokenPair = await this.jwtTokenService.createTokenPair(tokenPayload);

    await this.refreshTokenModel.create({
      token: tokenPair.refreshToken,
      userId: user._id,
    });

    return {
      user,
      tokenPair,
    };
  }

  async refreshSession(refreshTokenInstants): Promise<AuthResponse> {
    const user = await this.userModel.findById(refreshTokenInstants.userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const tokenPayload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const tokenPair = await this.jwtTokenService.createTokenPair(tokenPayload);

    await this.refreshTokenModel.findOneAndUpdate(
      { token: refreshTokenInstants.token },
      { token: tokenPair.refreshToken },
    );

    // console.log(tokenPair)

    return {
      user,
      tokenPair,
    };
  }
}
