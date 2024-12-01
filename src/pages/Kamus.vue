<script setup lang="ts">
const abjadlist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
</script>
<template>
    <div class="w-full mt-4 mb-8">
        <h1 class="text-center text-[2rem] font-bold">Kamus BIS</h1>
        <p class="text-center">Kamus BIS dapat digunakan untuk membantu  pembelajaran bahasa isyarat selain dari video</p>
    </div>
    <div class="w-full flex justify-center py-4">
        <div class="w-[80%] flex justify-center flex-wrap gap-4">
            <CardKamus v-for="a in abjadlist" :name="a"/>
        </div>
    </div>
</template>