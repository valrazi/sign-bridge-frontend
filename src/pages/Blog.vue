<script setup lang="ts">
import { Blog } from '@/types';
const {setLoading, removeLoading} = useLoaderStore()
const blogs = ref<Blog[]>([])
const totalData = ref<number>(0)
const page = ref<number>(1)
const getData = async () => {
    try {
        setLoading()
        const response = await apiBlogAll({limit: 9, page: page.value})
        if(!response.error) {
            blogs.value = response.data.rows
        }
    } catch (error) {
        console.log(error)
    } finally {
        removeLoading()
    }
}

const changePage = (pageNow: number) => {
    page.value = pageNow
    getData()
}

onMounted(() => {
    getData()
})
</script>
<template>
    <div class="w-full min-h-[300px] bg-secondary-200 py-2 flex justify-center items-center mb-4">
        <img src="@/assets/img/blog-banner.png" class="w-1/4" alt="">
    </div>
    <h1 class="text-[2rem] font-bold text-center">Blog</h1>
    <p class="text-center">Baca berita atau artikel menarik untuk kamu baca</p>
    <div class="flex justify-center flex-wrap p-8   ">
        <div class="w-[80%] flex justify-center flex-wrap gap-8">
            <CardHomeBlog :blog="b" v-for="b in blogs" style="width: 25%;"/>
        </div>
    </div>
    <div class="w-full flex justify-center  p-8">
        <div class="w-[80%] flex justify-center">
            <el-pagination layout="prev, pager, next" :total="totalData" :default-page-size="9" @change="changePage" />
        </div>
    </div>
</template>