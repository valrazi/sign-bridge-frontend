<script setup lang="ts">
import { Blog } from '@/types';
import moment from 'moment';
const {setLoading, removeLoading} = useLoaderStore()
const route = useRoute()
const blog = ref<Blog>()
const id = route.query.id
const getData = async () => {
    try {
        setLoading()
        const response = await apiBlogDetail(id?.toString()!)
        if(!response.error) {
            blog.value = response.data
            blog.value.createdAt = moment(blog.value.createdAt).format('DD MMM YYYY')
        }
    } catch (error) {
        console.log(error)
    } finally {
        removeLoading()
    }
}

onMounted(() => {
    getData()
})
</script>
<template>
    <div class="w-full flex justify-center py-8">
        <div class="w-[80%] bg-secondary-200 rounded-xl shadow-xl min-h-dvh flex flex-col items-center px-8 py-16 gap-4" v-if="blog">
            <h1 class="w-[90%] text-center text-[2rem] text-white font-bold">{{ blog.title }}</h1>
            <div class="w-[80%] flex gap-x-4 mt-4">
                <div class="flex items-center gap-x-1 text-white text-sm">
                    <IconProfile class="w-[24px] h-[24px]"/>
                    <h2>{{ blog.User.email }}</h2>
                </div>
                <div class="flex items-center gap-x-1 text-white text-sm">
                    <IconCalendar class="w-[24px] h-[24px]"/>
                    <h2>{{ blog.createdAt }}</h2>
                </div>
            </div>  
            <div class="w-[80%] text-white text-base text-justify">
                {{ blog.content }}
            </div>
        </div>
        <div class="w-full min-h-dvh flex justify-center items-center" v-else>
            <el-empty description="Data not Found" />
        </div>
    </div>
</template>