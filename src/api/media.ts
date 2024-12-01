import { ResponseApi } from "@/types"
import api from "./client"

export const apiMediaUpload = (img64: string) => {
    return api<ResponseApi<string>>({
        method: 'POST',
        url: '/media',
        data: {
            img64
        }
    })
}