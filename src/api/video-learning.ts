import { ResponseApi, ResponseMeta, VideoLearning, VideoLearningQuery } from "@/types";
import api from "./client";

export const apiVideoLearningAll = (query: VideoLearningQuery) => {
    return api<ResponseApi<{rows: VideoLearning[], meta: ResponseMeta}>>({
        method: 'GET',
        url: '/video-learning',
        params: query
    })
}