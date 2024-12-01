<script setup lang="ts">
defineProps<{
    text: string
}>()
</script>
<template>
    <button 
    class="w-full text-sm font-bold h-fit py-2 px-4 rounded-xl hover:cursor-pointer shadow-md"
    >{{ text }}</button>
</template>