import { JwtService } from '@nestjs/jwt';
export declare class JwtTokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createTokenPair(payload: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    verifyAccessToken(token: string): Promise<any>;
    verifyRefreshToken(token: string): Promise<any>;
}
