import { Calendar, CalendarAddRequest, ResponseApi } from "@/types"
import api from "./client"

export const apiCalendarAll = () => {
    return api<ResponseApi<Calendar[]>>({
        method: 'GET',
        url: '/calendar'
    })
}

export const apiCalendarDetail = (id:string) => {
    return api<ResponseApi<Calendar>>({
        method: 'GET',
        url: '/calendar/' + id,
    })
}


export const apiCalendarCreate = (payload: CalendarAddRequest) => {
    return api<ResponseApi<Calendar>>({
        method: 'POST',
        url: '/calendar',
        data: payload
    })
}

export const apiCalendarEdit = (payload: CalendarAddRequest, id: string) => {
    return api<ResponseApi<Calendar>>({
        method: 'PUT',
        url: '/calendar/' + id,
        data: payload
    })
}

export const apiCalendarDelete = (id:string) => {
    return api<ResponseApi<any>>({
        method:'DELETE',
        url: '/calendar/' + id,
    })
}