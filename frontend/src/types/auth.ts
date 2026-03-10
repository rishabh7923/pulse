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
        user: {
            id: string;
            email: string;
            username: string;
            verified: boolean;
        }
    }
}

export type SignupResponse = LoginResponse