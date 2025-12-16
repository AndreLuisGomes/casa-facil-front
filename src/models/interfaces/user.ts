export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface UserSession{
    token: string;
    name: string;
}

export interface UserLoginDTO{
    email: string;
    password: string;
}

export interface UserRegisterDTO{
    name: string;
    email: string;
    password: string;   
}