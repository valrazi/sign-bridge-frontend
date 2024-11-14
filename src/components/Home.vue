<script setup lang="ts">
const dropdownCategory = ref<boolean>(false)
const categories = ref<string[]>(
  ['Concert', 'Comedy', 'Festival', 'General', 'Music', 'Movie']
)

const emit = defineEmits(['changeView'])
const changeView = () => {
  emit('changeView', 'details')
} 
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>
<template>
  <div class="tixfly-sdk-w-full tixfly-sdk-min-h-dvh">
    <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-between">
      <h1 class="tixfly-sdk-font-bold tixfly-sdk-text-3xl">Escape the ordinary</h1>
      <div class="tixfly-sdk-relative">
        <button @click="dropdownCategory = !dropdownCategory"
          class="tixfly-sdk-bg-card-primary tixfly-sdk-flex tixfly-sdk-gap-x-2 tixfly-sdk-items-center tixfly-sdk-justify-center tixfly-sdk-px-4 tixfly-sdk-py-1.5 tixfly-sdk-rounded-xl tixfly-sdk-hover:cursor-pointer">
          <font-awesome-icon :icon="['fas', 'shapes']" />
          <span>Event Category</span>
          <font-awesome-icon :icon="['fas', 'chevron-up']" size="xs" v-if="!dropdownCategory" />
          <font-awesome-icon :icon="['fas', 'chevron-down']" size="xs" v-else />
        </button>

        <div v-if="dropdownCategory" class="tixfly-sdk-w-full tixfly-sdk-bg-card-primary tixfly-sdk-min-w-[130%] tixfly-sdk-max-w-[130%] tixfly-sdk-min-h-[50%] tixfly-sdk-absolute tixfly-sdk-top-12 tixfly-sdk-right-6 tixfly-sdk-py-2 tixfly-sdk-rounded-md tixfly-sdk-border-[0.5px] tixfly-sdk-border-text-primary 
        tixfly-sdk-flex tixfly-sdk-flex-row tixfly-sdk-gap-x-2 tixfly-sdk-flex-wrap tixfly-sdk-px-2">
          <p v-for="c in categories" class="tixfly-sdk-w-[40%] tixfly-sdk-px-4 tixfly-sdk-py-2 tixfly-sdk-rounded-lg tixfly-sdk-hover:bg-card-secondary tixfly-sdk-hover:cursor-pointer">
            {{ c }}</p>
        </div>

      </div>
    </div>
    <ListEvent v-for="_ in 10" @change-view="changeView"/>
  </div>
</template>