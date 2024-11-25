<template>
  <div class="flex justify-center">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo w-32 p-5" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/img/vue.svg" class="logo vue w-32 p-5" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <ImageList />
</template>

<style scoped>
.logo {
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
