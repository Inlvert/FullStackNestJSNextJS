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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const refreshToken_schema_1 = require("../auth/model/refreshToken.schema");
const jwt_token_service_1 = require("../services/jwt-token.service");
let JwtRefreshTokenGuard = class JwtRefreshTokenGuard {
    jwtTokenService;
    refreshTokenModel;
    constructor(jwtTokenService, refreshTokenModel) {
        this.jwtTokenService = jwtTokenService;
        this.refreshTokenModel = refreshTokenModel;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const refreshToken = req?.body.refreshToken;
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('RefreshToken missing');
        }
        try {
            const tokenPayload = await this.jwtTokenService.verifyRefreshToken(refreshToken);
            console.log('Refresh payload:', tokenPayload);
            const tokenInstants = await this.refreshTokenModel.findOne({
                token: refreshToken,
                userId: new mongoose_2.Types.ObjectId(tokenPayload.id),
            });
            if (!tokenInstants) {
                throw new common_1.UnauthorizedException('Refresh token required');
            }
            req['tokenInstants'] = tokenInstants;
            console.log(req);
            console.log('tokenInstants', tokenInstants);
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.JwtRefreshTokenGuard = JwtRefreshTokenGuard;
exports.JwtRefreshTokenGuard = JwtRefreshTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(refreshToken_schema_1.RefreshToken.name)),
    __metadata("design:paramtypes", [jwt_token_service_1.JwtTokenService,
        mongoose_2.Model])
], JwtRefreshTokenGuard);
//# sourceMappingURL=jwt-Refreshtoken.guard.js.map