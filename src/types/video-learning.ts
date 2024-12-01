export type VideoLearning = {
    id: string
    createdAt: string
    updatedAt: string
    categoriesId: number
    subcategoriesId: number
    name: string
    link: string
}

export type VideoLearningQuery = {
    limit: number
    page: number
    categoriesId?: number
    subcategoriesId?: number | null
}