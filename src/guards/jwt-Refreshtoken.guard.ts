import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model, Types } from 'mongoose';
import {
  RefreshToken,
  refreshTokenDocument,
} from 'src/auth/model/refreshToken.schema';
import { JwtTokenService } from 'src/services/jwt-token.service';

@Injectable()
export class JwtRefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<refreshTokenDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const refreshToken = req?.body.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('RefreshToken missing');
    }

    try {
      const tokenPayload =
        await this.jwtTokenService.verifyRefreshToken(refreshToken);
        
      console.log('Refresh payload:', tokenPayload);

      const tokenInstants = await this.refreshTokenModel.findOne({
        token: refreshToken,
        // userId: tokenPayload.id,
        userId: new Types.ObjectId(tokenPayload.id),
      });

      if (!tokenInstants) {
        throw new UnauthorizedException('Refresh token required');
      }

      req['tokenInstants'] = tokenInstants;

      console.log(req);
      console.log('tokenInstants', tokenInstants)


      return true;
    } catch (err) {
      console.error('JWT verify error:', err.message);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
