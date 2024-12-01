<script setup lang="ts">
const props = defineProps<{
    name: string
}>()
const imagePath = computed(() => {
    return new URL(`/src/assets/img/abjad/${props.name}.png`, import.meta.url).href
})
</script>
<template>
    <div class="w-[23%] min-h-[40dvh] bg-secondary-100 rounded-lg">
        <div
            class="w-full flex justify-center items-center h-[70%] bg-secondary-200 border-2 border-black rounded-tl-lg rounded-tr-lg">
            <img :src="imagePath" alt="" class="max-w-28">
        </div>
        <div class="w-full flex justify-center items-center h-[30%]">
            <h1 class="text-center">{{ name }}</h1>
        </div>
    </div>
</template>