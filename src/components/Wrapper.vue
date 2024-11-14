<script setup lang="ts">
import Home from '@/components/Home.vue';
import AtendeeDetails from '@/components/AtendeeDetails.vue';
import ContactDetails from '@/components/ContactDetails.vue';
import Details from '@/components/Details.vue';

const popup = ref(localStorage.getItem('tixfly-sdk-popup') || null)
const popupShow = ref(localStorage.getItem('tixfly-sdk-popupshow') || null)

const view_type = ref('home')
const changeView = (view: string) => {
    view_type.value = view
}

function updateLocalStorageData(event?: StorageEvent) {
    if (event?.newValue) {
        localStorage.setItem('tixfly-sdk-popupshow', event.newValue)
    }
    popupShow.value = localStorage.getItem('tixfly-sdk-popupshow');
    if (popupShow.value) {
        console.log('hit here')
        if (popupShow.value == 'true') {
            document.documentElement.style.setProperty('--tixfly-sdk-bgcolor', '#1E1E1E')
        } else {
            document.documentElement.style.setProperty('--tixfly-sdk-bgcolor', 'transparent')
        }
    }
}

const showPopup = () => {
    localStorage.setItem('tixfly-sdk-popupshow', 'true')
    updateLocalStorageData()
}

onMounted(() => {
    popup.value = localStorage.getItem('tixfly-sdk-popup')
    if (popup) {
        document.documentElement.style.setProperty('--tixfly-sdk-bgcolor', 'transparent')
        window.addEventListener('storage', updateLocalStorageData);

    } else {
        document.documentElement.style.setProperty('--tixfly-sdk-bgcolor', '#1E1E1E')
    }
})
onUnmounted(() => {
    window.removeEventListener('storage', updateLocalStorageData);

});
</script>
<template>
    <div
    class="tixfly-sdk-absolute tixfly-sdk-top-0 tixfly-sdk-bg-black 
    tixfly-sdk-my-8 tixfly-sdk-mx-4 tixfly-sdk-p-8 tixfly-sdk-rounded-xl
    tixfly-sdk-min-w-[98dvw] tixfly-sdk-max-w-[100dvw] tixfly-sdk-z-[999]">
        <div class="tixfly-sdk-w-full tixfly-sdk-min-h-svh tixfly-sdk-relative" v-if="!popup">
            <Home v-if="view_type == 'home'" @change-view="changeView" />
            <Details v-if="view_type == 'details'" @change-view="changeView" />
            <AtendeeDetails v-if="view_type == 'atendee'" @change-view="changeView" />
            <ContactDetails v-if="view_type == 'contact'" @change-view="changeView" />
            <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-end tixfly-sdk-items-end">
                <img src="@/assets/img/Logo.png" class="tixfly-sdk-mt-8 tixfly-sdk-w-32" alt="">
            </div>
        </div>

        <div v-else>
            {{ popupShow }}
            <div class="tixfly-sdk-w-full tixfly-sdk-min-h-svh tixfly-sdk-relative" v-if="popupShow == 'true'">
                <Home v-if="view_type == 'home'" @change-view="changeView" />
                <Details v-if="view_type == 'details'" @change-view="changeView" />
                <AtendeeDetails v-if="view_type == 'atendee'" @change-view="changeView" />
                <ContactDetails v-if="view_type == 'contact'" @change-view="changeView" />
                <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-end tixfly-sdk-items-end">
                    <img src="@/assets/img/Logo.png" class="tixfly-sdk-mt-8 tixfly-sdk-w-32" alt="">
                </div>
            </div>
            <div class="tixfly-sdk-w-full tixfly-sdk-min-h-svh tixfly-sdk-flex tixfly-sdk-justify-end tixfly-sdk-items-end"
                v-else>
                <button @click="showPopup"
                    class="tixfly-sdk-bg-primary border-2 tixfly-sdk-border-text-secondary tixfly-sdk-rounded-full tixfly-sdk-w-[3rem] tixfly-sdk-h-[3rem] tixfly-sdk-p-2 tixfly-sdk-text-xs tixfly-sdk-text-text-secondary tixfly-sdk-text-center">
                    <font-awesome-icon :icon="['fas', 'dove']" />
                </button>
            </div>
        </div>
    </div>
</template>