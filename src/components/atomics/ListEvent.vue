<script setup lang="ts">
const emit = defineEmits(['changeView'])
const changeView = () => {
    emit('changeView', 'details')
}
</script>
<template>
    <div class="tixfly-sdk-w-full tixfly-sdk-my-4 tixfly-sdk-px-4">
        <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-between tixfly-sdk-bg-card-secondary tixfly-sdk-rounded-xl tixfly-sdk-items-center">
            <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-gap-x-4 tixfly-sdk-min-h-[20%] ">
                <img class="tixfly-sdk-min-w-[15%] tixfly-sdk-max-w-[15%] tixfly-sdk-object-cover tixfly-sdk-rounded-tl-xl tixfly-sdk-rounded-bl-xl"
                    src="https://asset.kompas.com/crops/A5cwTkFX8Z36eGjTuAWbekwg_y8=/3x0:1200x798/1200x800/data/photo/2023/02/28/63fdac77cacd8.jpg"
                    alt="">
                <div class="tixfly-sdk-flex tixfly-sdk-flex-col tixfly-sdk-justify-center">
                    <h1 class="tixfly-sdk-text-[1.5rem] tixfly-sdk-font-bold">IDS SPECIAL STAGE</h1>
                    <p class="tixfly-sdk-flex tixfly-sdk-gap-x-2 tixfly-sdk-items-center tixfly-sdk-mt-2 tixfly-sdk-mb-1 tixfly-sdk-text-sm tixfly-sdk-text-text-secondary">
                        <font-awesome-icon :icon="['far', 'clock']" /><span>5 Oct 2024, 19:00 - 23:00</span>
                    </p>
                    <p class="tixfly-sdk-flex tixfly-sdk-gap-x-2 tixfly-sdk-items-center tixfly-sdk-text-sm tixfly-sdk-text-text-secondary">
                        <font-awesome-icon :icon="['fas', 'location-dot']" /><span>Meikarta Speedway</span>
                    </p>
                </div>
            </div>

            <button class="tixfly-sdk-font-bold tixfly-sdk-border tixfly-sdk-h-fit tixfly-sdk-px-4 tixfly-sdk-py-2 tixfly-sdk-rounded-lg tixfly-sdk-border-text-secondary tixfly-sdk-mr-6"
            @click="changeView">
                Registration
            </button>
        </div>
    </div>
</template>