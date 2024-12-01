<script setup lang="ts">
import { VideoLearning } from '@/types';

defineProps<{
    isVideo?: boolean;
    data? : VideoLearning;
    text?:string
}>()
</script>
<template>
    <div class="w-1/4 rounded-xl bg-secondary-200 border border-black p-1"
    @click="">
        <img src="@/assets/img/card-video.jpg" class="w-full rounded-lg  mb-4" alt="" v-if="!data">
        <video :src="data.link" controls v-else class="rounded-lg"></video>
        <p class="text-xs p-2">
            <span v-if="!data">{{ text }}</span>
            <span v-else class="text-white">{{ data.name }}</span>
        </p>
    </div>
</template>