import { Blog, BlogAddPayload, ResponseApi, ResponseMeta } from "@/types"
import api from "./client"

export const apiBlogAll = (query: {limit: number, page:number}) => {
    return api<ResponseApi<{rows: Blog[], meta: ResponseMeta}>>({
        method: 'GET',
        url: '/blog',
        params: {
            limit: query.limit,
            page: query.page
        }
    })
}

export const apiBlogDetail = (id: string) => {
    return api<ResponseApi<Blog>>({
        method: 'GET',
        url: '/blog/' + id,
    })
}

export const apiBlogAdd = (payload: BlogAddPayload) => {
    return api<ResponseApi<Blog>>({
        method: 'POST',
        url: '/blog',
        data: payload
    })
}

export const apiBlogEdit = (payload: BlogAddPayload, id: string) => {
    return api<ResponseApi<Blog>>({
        method: 'PUT',
        url: '/blog/' + id,
        data: payload
    })
}

export const apiBlogDelete = (id:string) => {
    return api<ResponseApi<any>>({
        method:'DELETE',
        url:'/blog/' + id,
    })
}