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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const jwt_token_service_1 = require("./jwt-token.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const refreshToken_schema_1 = require("../auth/model/refreshToken.schema");
const mongoose_2 = require("mongoose");
let SessionService = class SessionService {
    userModel;
    refreshTokenModel;
    jwtTokenService;
    constructor(userModel, refreshTokenModel, jwtTokenService) {
        this.userModel = userModel;
        this.refreshTokenModel = refreshTokenModel;
        this.jwtTokenService = jwtTokenService;
    }
    async createSession(user) {
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
    async refreshSession(refreshTokenInstants) {
        const user = await this.userModel.findById(refreshTokenInstants.userId);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        const tokenPayload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        const tokenPair = await this.jwtTokenService.createTokenPair(tokenPayload);
        await this.refreshTokenModel.findOneAndUpdate({ token: refreshTokenInstants.token }, { token: tokenPair.refreshToken });
        return {
            user,
            tokenPair,
        };
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(refreshToken_schema_1.RefreshToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_token_service_1.JwtTokenService])
], SessionService);
//# sourceMappingURL=session.service.js.map