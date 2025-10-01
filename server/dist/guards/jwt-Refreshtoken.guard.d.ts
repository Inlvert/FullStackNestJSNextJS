import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { refreshTokenDocument } from 'src/auth/model/refreshToken.schema';
import { JwtTokenService } from 'src/services/jwt-token.service';
export declare class JwtRefreshTokenGuard implements CanActivate {
    private readonly jwtTokenService;
    private refreshTokenModel;
    constructor(jwtTokenService: JwtTokenService, refreshTokenModel: Model<refreshTokenDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
