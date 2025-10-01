"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const refreshToken_schema_1 = require("./model/refreshToken.schema");
const user_schema_1 = require("../user/schema/user.schema");
const jwt_1 = require("@nestjs/jwt");
const session_service_1 = require("../services/session.service");
const jwt_token_service_1 = require("../services/jwt-token.service");
const jwt_Refreshtoken_guard_1 = require("../guards/jwt-Refreshtoken.guard");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: refreshToken_schema_1.RefreshToken.name, schema: refreshToken_schema_1.RefreshTokenSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            jwt_1.JwtModule.register({}),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            session_service_1.SessionService,
            jwt_token_service_1.JwtTokenService,
            jwt_Refreshtoken_guard_1.JwtRefreshTokenGuard,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map