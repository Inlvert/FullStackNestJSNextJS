import { JwtTokenService } from './jwt-token.service';
import { UserDocument } from 'src/user/schema/user.schema';
import { refreshTokenDocument } from 'src/auth/model/refreshToken.schema';
import { Model } from 'mongoose';
import { AuthResponse } from 'src/auth/dto/auth-response.dto';
export declare class SessionService {
    private userModel;
    private refreshTokenModel;
    private readonly jwtTokenService;
    constructor(userModel: Model<UserDocument>, refreshTokenModel: Model<refreshTokenDocument>, jwtTokenService: JwtTokenService);
    createSession(user: UserDocument): Promise<{
        user: UserDocument;
        tokenPair: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refreshSession(refreshTokenInstants: any): Promise<AuthResponse>;
}
