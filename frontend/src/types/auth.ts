import type { User } from "./user";

export type SIGNUPSCHEMA = {
    username: string;
    email: string;
    password: string;
}

export type LOGINSCHEMA = Pick<SIGNUPSCHEMA, "username" | "password">

export type LoginResponse  = {
    success: boolean;
    message:string;
    data: {
        token: string;
        user: User
    }
}

export type SignupResponse = LoginResponse