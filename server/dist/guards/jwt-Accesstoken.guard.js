"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_token_service_1 = require("../services/jwt-token.service");
let JwtAccessTokenGuard = class JwtAccessTokenGuard {
    jwtTokenService;
    constructor(jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header missing');
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Invalid authorization format');
        }
        try {
            const payload = await this.jwtTokenService.verifyAccessToken(token);
            console.log(token);
            console.log(payload);
            request['user'] = payload;
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.JwtAccessTokenGuard = JwtAccessTokenGuard;
exports.JwtAccessTokenGuard = JwtAccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_token_service_1.JwtTokenService])
], JwtAccessTokenGuard);
//# sourceMappingURL=jwt-Accesstoken.guard.js.map