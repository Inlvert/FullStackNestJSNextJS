import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from 'src/services/jwt-token.service';
import { JwtTokenGuard } from 'src/guards/jwt-token.guard';

@Module({
  providers: [UserService, JwtTokenService, JwtTokenGuard],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
  ],
  exports: [MongooseModule],
})
export class UserModule {}
