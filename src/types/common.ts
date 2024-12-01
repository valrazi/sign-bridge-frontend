export type ResponseApi<T> = {
    status: string;
    message: string;
    error?: string;
    data: T
}

export type ResponseMeta = {
    limit: number
    page: number
    totalPage: number
    total: number
}