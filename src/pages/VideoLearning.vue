<script setup lang="ts">
import videoLearningImg from '@/assets/img/video-learning.png'
import { VideoLearning, VideoLearningQuery } from '@/types';
const {setLoading, removeLoading} = useLoaderStore()
const query = ref<VideoLearningQuery>({
    categoriesId: 1,
    subcategoriesId: null,
    limit: 9,
    page: 1
})
const totalData = ref<number>(0)
const videos = ref<VideoLearning[]>([])
const getData = async () => {
    setLoading()
    const response = await apiVideoLearningAll(query.value)
    videos.value = response.data.rows
    totalData.value = response.data.meta.total
    removeLoading()
}

const activeQuery = ref<'imbuhan' | 'angka'>('imbuhan')
const changeQuery = (type: 'imbuhan' | 'angka', subCategories?: string) => {
    activeQuery.value = type
    if(type == 'angka') {
        query.value.categoriesId = 2
        query.value.subcategoriesId = null
    }else {
        query.value.categoriesId = 1
        query.value.subcategoriesId = Number(subCategories)
    }
    query.value.page = 1
    getData()
}
const imbuhanSelect = ref<string>("imbuhan")
watch(() => imbuhanSelect.value, () => {
    if(imbuhanSelect.value != 'imbuhan') {
        changeQuery('imbuhan', imbuhanSelect.value)
    }
})
const changePage = (page: number) => {
    query.value.page = page
    getData()
}
onMounted(() => {
    getData()
})
</script>
<template>
    <HeroBanner 
    :title="'Apa Itu Video Pembelajaran?'" 
    :description="'video pembelajaran merupakan fitur utama kami yang bertujuan untuk memudahkan teman-teman dalam memahami bahasa isyarat'"
    :image="videoLearningImg"/>

    <div class="my-4 w-full flex justify-center">
        <div class="w-[70%] flex justify-end gap-x-4">
            <select 
            v-model="imbuhanSelect"
            name="" id="" class="px-4 py-2 rounded-lg font-bold" :class="{'bg-secondary-200' : activeQuery == 'imbuhan', 'bg-white' : activeQuery != 'imbuhan'}">
                <option value="imbuhan" selected disabled>Imbuhan</option>
                <option value="1">Awalan</option>
                <option value="2">Akhiran</option>
                <option value="3">Imbuhan</option>
            </select>
            <div class="w-[15%]">
                <ButtonCustom
                @click="changeQuery('angka')" 
                :class="{'bg-secondary-200' : activeQuery == 'angka', 'bg-white' : activeQuery != 'angka'}"
                :text="'Angka'" class="text-black shadow-md"/>
            </div>
        </div>
    </div>

    <h1 class="font-bold text-center text-[2rem]">Video Pembelajaran</h1>
    <div class="mt-4 w-full flex justify-center py-8">
        <div class="w-[70%] flex justify-between gap-3 flex-wrap ">
            <CardHomeVideo v-for="d in videos" style="width: 30%;" :data="d" :is-video="true"/>
        </div>
    </div>

    <div class="w-full flex justify-center  p-8">
        <div class="w-[80%] flex justify-center">
            <el-pagination layout="prev, pager, next" :total="totalData" :default-page-size="9" @change="changePage" />
        </div>
    </div>
</template>