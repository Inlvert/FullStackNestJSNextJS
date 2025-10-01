import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    private users;
    creatUser(createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
