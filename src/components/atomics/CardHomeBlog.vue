<script setup lang="ts">
import { Blog } from '@/types';
import { useRouter } from 'vue-router';

defineProps<{
    blog: Blog
}>();

const router = useRouter();
</script>

<template>
    <div 
        class="w-[20%] min-h-[400px] border border-black rounded-tr-xl rounded-br-xl"
        :style="{
            backgroundImage: `url(${blog.backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.5 // Adjust opacity as needed
        }"
    >
        <div class="w-full h-full flex flex-col justify-center items-center gap-y-4 p-2 bg-secondary-200 bg-opacity-40 text-white">
            <h1 class="text-[1.2rem] font-bold">{{ blog.title }}</h1>
            <p class="text-xs line-clamp-2">{{ blog.content }}</p>
            <div class="w-full flex justify-center items-center">
                <div class="w-[80%]">
                    <ButtonCustom :text="'Lihat'" class="bg-white text-black hover:bg-secondary-200"
                    @click="router.push('blog-detail?id=' + blog.id)"/>
                </div>
            </div>
        </div>
    </div>
</template>
