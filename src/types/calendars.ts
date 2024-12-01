import { User } from "./user"

export interface Calendar {
    id: string
    title: string
    color: string
    eventDate: string
    userId: string
    updatedAt: string
    createdAt: string;
    User: User;
    description?:string
}

export interface CalendarAddRequest {
    title: string
    eventDate: string
    color: string;
    description?:string;
}