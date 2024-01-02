<script setup lang="ts">
import { Photo, apiGetPhotos } from '@/api/photos';

const photos = ref<Photo[]>([])

onMounted(async () => {
  const { data } = await apiGetPhotos()
  photos.value = data
})
</script>

<template>
  <div class="grid grid-cols-5 gap-5 mt-10">
    <div v-for="photo in photos" :key="photo.id">
      <img :src="photo.url" class="rounded-xl" />
    </div>
  </div>
</template>