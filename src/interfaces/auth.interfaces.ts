export interface ILogin {
    email: string;
    password: string;
}
export interface ILoginPayload {
    credentials: ILogin;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
}
export interface IRegisterPayload {
    user: IRegister;
}

export interface IUser {
    name?: string;
    email?: string;
    password?: string;
}