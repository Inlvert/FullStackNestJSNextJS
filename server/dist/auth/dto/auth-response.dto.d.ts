import { UserDocument } from 'src/user/schema/user.schema';
export interface AuthResponse {
    user: UserDocument;
    tokenPair: {
        accessToken: string;
        refreshToken: string;
    };
}
