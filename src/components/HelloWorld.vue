<script setup lang="ts">
defineProps<{ msg: string }>()

const { increment } = useCounterStore()
const { count } = storeToRefs(useCounterStore())

const { t } = useI18n()
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="increment"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      count is {{ count }}
    </button>
    <p>
      Edit
      <code>views/components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    {{ t('hello.message') }}
  </p>
  <LanguageChooser />
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
