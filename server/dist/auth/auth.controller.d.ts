import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registration(createUserDto: CreateUserDto): Promise<import("./dto/auth-response.dto").AuthResponse>;
    login(createUserDto: CreateUserDto): Promise<import("./dto/auth-response.dto").AuthResponse>;
    refresh(req: any): Promise<import("./dto/auth-response.dto").AuthResponse>;
}
