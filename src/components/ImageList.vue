<script setup lang="ts">
import { Photo } from '@/types';

const photos = ref<Photo[]>([])

onMounted(async () => {
  const data = await apiGetPhotos()
  photos.value = data
})
</script>

<template>
  <div class="grid grid-cols-5 gap-5 mt-10">
    <ImageListItem v-for="photo in photos" :key="photo.id" :photo="photo" />
  </div>
</template>