import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDocument } from 'src/user/schema/user.schema';
import { AuthResponse } from './dto/auth-response.dto';
import { SessionService } from 'src/services/session.service';
export declare class AuthService {
    private userModel;
    private readonly sessionService;
    constructor(userModel: Model<UserDocument>, sessionService: SessionService);
    registrationUser(createUserDto: CreateUserDto): Promise<AuthResponse>;
    loginUser(createUserDto: CreateUserDto): Promise<AuthResponse>;
    refreshUser(refreshToken: string): Promise<AuthResponse>;
}
