export interface User {
    id: string; // UUID
    email: string;
    fullName?: string;
    phoneNumber?: string;
    placeBirth?: string;
    dateBirth: Date;
    securityQuestion?: string;
    securityAnswer?: string;
    roleId: number;
}

export interface UserLoginPayload {
    email: string;
    password: string
}

export interface UserLoginResponse {
    token: string;
    user: User
}

export interface UserRegisterPayload {
    fullName: string
    email: string
    password: string
    phoneNumber: string
    placeBirth: string
    dateBirth: string
    securityQuestion: string
    securityAnswer: string
}

export interface UserForgotPasswordPayload {
    email: string;
    securityQuestion: string 
    securityAnswer: string
    password: string
}
