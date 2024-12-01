import { User } from "./user"

export interface Blog {
    id: string
    title: string
    backgroundImage: string
    content: string
    userId: string
    updatedAt: string
    createdAt: string;
    User: User
}

export interface BlogAddPayload {
    title:string;
    content:string;
    backgroundImage:string;
}