import { IUser } from "../interfaces/auth.interfaces";
import User from "../models/user.model";

export class AuthService{
    async findOneUser(user: IUser) {
        const userFound = await User.findOne(user);
        return userFound;
    }

    async createUser(user: IUser) {
        const userCreated = await User.create(user);
        return userCreated;
    }
}