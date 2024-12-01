<script setup lang="ts">
defineProps<{
    title: string;
    description:string;
    image:string
}>()
</script>
<template>
    <div class="w-full flex justify-center">
        <div class="w-[70%]  min-h-[350px] bg-secondary-200 rounded-xl flex justify-center items-center px-8">
            <div class="w-[60%] text-white flex flex-col items-center gap-y-4 px-8">
                <h1 class="text-[2rem] font-bold w-full">{{ title }}</h1>
                <p class=" text-[1rem]">{{description}}</p>
            </div>
            <div class="w-1/3 flex">
                <img :src="image" alt="" class="w-[70%] bg-secondary-100 p-2 rounded-[3rem]">
            </div>
        </div>
    </div>
</template>