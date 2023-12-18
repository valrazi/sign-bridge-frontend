<script setup lang="ts">
const { locale } = useI18n({ useScope: 'global' })

const changeLanguageTo = (lang: string) => {
  localStorage.setItem('locale', lang)
  locale.value = lang
}
</script>

<template>
  <section>
    <a href="#" @click.prevent="() => changeLanguageTo('id')">id</a>
    <span> / </span>
    <a href="#" @click.prevent="() => changeLanguageTo('en')">en</a>
  </section>
</template>