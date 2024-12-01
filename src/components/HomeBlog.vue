<script setup lang="ts">
import { Blog } from '@/types';
const {setLoading, removeLoading} = useLoaderStore()
const router = useRouter()
const blogs = ref<Blog[]>([])

const getData = async () => {
    try {
        setLoading()
        const response = await apiBlogAll({limit: 3, page: 1})
        if(!response.error) {
            blogs.value = response.data.rows
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
    <div class="w-full min-h-[500px] flex flex-col items-center mt-8">
        <h1 class="font-bold text-[2rem]">Blog</h1>
        <h2 class="font-bold text-[1rem]">Baca berita atau artikel menarik untuk kamu baca</h2>
        <div class="w-full flex gap-x-4 justify-center flex-wrap mt-4">
            <CardHomeBlog v-for="b in blogs" :blog="b"/>
        </div>
        <div class="w-full my-4 flex justify-end">
            <div class="w-[20%] px-8 mx-4">
                <ButtonCustom :text="'Lihat Semua >'" class="bg-secondary-200" @click="router.push({name:'blog'})"/>
            </div>
        </div>
    </div>
</template>