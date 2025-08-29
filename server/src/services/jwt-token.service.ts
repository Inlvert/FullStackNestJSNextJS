import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const tokenCongig = {
  access: {
    secret: 'rftgyhujiok',
    expiresIn: '5min',
  },
  refresh: {
    secret: 'fghiuHIYGUI',
    expiresIn: '7d',
  },
};

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createTokenPair(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: tokenCongig.access.secret,
      expiresIn: tokenCongig.access.expiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: tokenCongig.refresh.secret,
      expiresIn: tokenCongig.refresh.expiresIn,
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: tokenCongig.access.secret,
    });
  }

  async verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: tokenCongig.refresh.secret,
    });
  }
}
