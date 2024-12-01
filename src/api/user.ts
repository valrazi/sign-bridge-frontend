import { ResponseApi, User, UserForgotPasswordPayload, UserLoginResponse, UserRegisterPayload } from "@/types"
import api from "./client"

export const apiUserLogin = (email: string, password: string) => {
    return api<ResponseApi<UserLoginResponse>>({
        method: 'POST',
        url: '/users/login',
        data: {email, password}
    })
}

export const apiUserRegister = (payload: UserRegisterPayload) => {
    return api<ResponseApi<User>>({
        method: 'POST',
        url: '/users/register',
        data: payload
    })
}

export const apiUserDetail = () => {
    return api<ResponseApi<User>>({
        method: 'GET',
        url: '/users/detail'
    })
}

export const apiUserUpdate = (fullName: string, email: string, phoneNumber: string) => {
    return api<ResponseApi<User>>({
        method: 'PUT',
        url: '/users',
        data: {fullName, email, phoneNumber}
    })
}

export const apiUserChangePassword = (oldPassword: string, newPassword: string) => {
    return api<ResponseApi<User>>({
        method: 'PUT',
        url: '/users/password',
        data: {oldPassword, newPassword}
    })
}

export const apiUserForgotPassword = (payload: UserForgotPasswordPayload) => {
    return api<ResponseApi<User>>({
        method: 'post',
        url: '/users/forget-password',
        data: payload
    })
}