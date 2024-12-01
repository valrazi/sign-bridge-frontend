<script setup lang="ts">
const router = useRouter()
</script>
<template>
    <div class="w-full min-h-[500px] flex flex-col items-center mt-8">
        <h1 class="font-bold text-[2rem]">Video Pembelajaran</h1>
        <div class="w-full flex gap-4 justify-center flex-wrap mt-4">
            <CardHomeVideo :text="'Imbuhan: Awalan'"/>
            <CardHomeVideo :text="'Imbuhan: Akhiran'"/>
            <CardHomeVideo :text="'Imbuhan: Partikel'"/>
            <CardHomeVideo :text="'Angka'"/>
        </div>
        <div class="w-full my-4 flex justify-end">
            <div class="w-[20%] px-8 mx-4">
                <ButtonCustom :text="'Lihat Semua >'" class="bg-secondary-200" @click="router.push({name:'video-learning'})"/>
            </div>
        </div>
    </div>
</template>