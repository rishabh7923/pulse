export type SIGNUPSCHEMA = {
    username:string;
    email:string;
    password:string;
}

export type LOGINSCHEMA  = Pick<SIGNUPSCHEMA, "username" | "password">