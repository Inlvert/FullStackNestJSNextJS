import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './model/refreshToken.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
