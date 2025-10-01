import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtTokenService } from 'src/services/jwt-token.service';
export declare class JwtAccessTokenGuard implements CanActivate {
    private readonly jwtTokenService;
    constructor(jwtTokenService: JwtTokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
