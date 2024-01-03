<script setup lang="ts">
import { Photo } from '@/api/photos';

defineProps<{
  photo: Photo
}>()
</script>

<template>
  <div>
    <img :src="photo.url" class="rounded-xl" />
  </div>
</template>