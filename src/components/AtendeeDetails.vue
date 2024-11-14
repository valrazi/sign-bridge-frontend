<script setup lang="ts">
const contact = ref(
    {
        fullName: '',
        email: '',
        phoneNumber: ''
    }
)

onMounted(() => {
    window.scrollTo(0, 0)
})

const emit = defineEmits(['changeView'])
const changeView = (viewName: string) => {
    emit('changeView', viewName)
}
</script>
<template>
    <div
        class="tixfly-sdk-w-full tixfly-sdk-min-h-[90dvh] tixfly-sdk-flex tixfly-sdk-flex-col tixfly-sdk-justify-between">
        <div class="tixfly-sdk-w-full">
            <h1 class="tixfly-sdk-text-xl tixfly-sdk-font-bold">Atendee Details</h1>
            <h1 class="tixfly-sdk-text-xl tixfly-sdk-font-bold tixfly-sdk-my-4">Data 1</h1>
            <div class="tixfly-sdk-w-full tixfly-sdk-relative tixfly-sdk-mb-8">
                <label
                    class="tixfly-sdk-absolute tixfly-sdk--top-3 tixfly-sdk-left-4 tixfly-sdk-z-50 tixfly-sdk-bg-primary">Full
                    Name</label>
                <input type="text" v-model="contact.fullName"
                    class="tixfly-sdk-w-[94%] tixfly-sdk-lg:w-[50%] tixfly-sdk-h-1/2 tixfly-sdk-rounded-lg tixfly-sdk-py-2 tixfly-sdk-border tixfly-sdk-border-white tixfly-sdk-bg-transparent tixfly-sdk-focus:border-white">
            </div>

            <div class="tixfly-sdk-w-full tixfly-sdk-relative tixfly-sdk-my-8">
                <label
                    class="tixfly-sdk-absolute tixfly-sdk--top-3 tixfly-sdk-left-4 tixfly-sdk-z-50 tixfly-sdk-bg-primary">Email</label>
                <input type="text" v-model="contact.email"
                    class="tixfly-sdk-w-[94%] tixfly-sdk-lg:w-[50%] tixfly-sdk-h-1/2 tixfly-sdk-rounded-lg tixfly-sdk-py-2 tixfly-sdk-border tixfly-sdk-border-white tixfly-sdk-bg-transparent tixfly-sdk-focus:border-white">
            </div>

            <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-my-8 ">
                <select
                    class="tixfly-sdk-rounded-tl-lg tixfly-sdk-rounded-bl-lg tixfly-sdk-py-[0.56rem] tixfly-sdk-bg-transparent tixfly-sdk-border tixfly-sdk-border-white tixfly-sdk-border-r-0">
                    <option value="+62" selected>+62</option>
                </select>
                <input type="text" v-model="contact.phoneNumber" class="tixfly-sdk-w-[90%] tixfly-sdk-h-1/2 tixfly-sdk-rounded-tr-lg tixfly-sdk-rounded-br-lg tixfly-sdk-py-[0.63rem] tixfly-sdk-px-4 tixfly-sdk-border tixfly-sdk-border-l-0
                tixfly-sdk-border-white tixfly-sdk-bg-transparent tixfly-sdk-focus:border-white tixfly-sdk-lg:w-[44%]"
                    placeholder="Whatsapp Number">
            </div>

        </div>

        <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-end tixfly-sdk-gap-x-4">
            <button
                class="tixfly-sdk-w-fit tixfly-sdk-px-12 tixfly-sdk-py-1.5 tixfly-sdk-border tixfly-sdk-border-text-primary tixfly-sdk-rounded-lg"
                @click="changeView('details')">Back</button>
            <button @click="changeView('contact')"
                class="tixfly-sdk-w-fit tixfly-sdk-px-12 tixfly-sdk-py-1.5 tixfly-sdk-bg-white tixfly-sdk-border tixfly-sdk-border-text-primary tixfly-sdk-rounded-lg">
                <h1
                    class="tixfly-sdk-bg-gradient-to-br tixfly-sdk-from-[#CE4F51]  tixfly-sdk-to-[#8C54FB] tixfly-sdk-text-transparent tixfly-sdk-inline-block tixfly-sdk-bg-clip-text">
                    Next</h1>
            </button>
        </div>
    </div>
</template>