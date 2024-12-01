<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const {logout} = useAuthStore()
const logoutAdmin = () => {
    logout()
    router.push({name:'admin-login'})
}
</script>
<template>
    <div class="w-[20%] min-h-dvh bg-secondary-200 relative">
        <div class="w-full px-4 py-[1.38rem] flex justify-center items-center text-white font-bold border-b-2">
            <h1 class="text-[1.5rem]">SignBridge</h1>
        </div>
        <div class="min-h-[70dvh] max-h-[70dvh] flex flex-col py-4 gap-4">
            <div
            :class="{'bg-secondary-100' : route.name == 'admin-home'}" 
            class="w-full flex justify-center items-center py-2 gap-x-4 text-white  hover:cursor-pointer"
            @click="router.push({name:'admin-home'})">
                <IconHome class="w-4 h-4"/>
                <p>Home</p>
            </div>
            <div
            :class="{'bg-secondary-100' : route.name == 'admin-blog'}" 
            class="w-full flex justify-center items-center py-2 gap-x-4 text-white  hover:cursor-pointer"
            @click="router.push({name:'admin-blog'})">
                <IconScreen class="w-4 h-4"/>
                <p>Blog</p>
            </div>
            <div
            :class="{'bg-secondary-100' : route.name == 'admin-calendar'}" 
            class="w-full flex justify-center items-center py-2 gap-x-4 text-white  hover:cursor-pointer"
            @click="router.push({name:'admin-calendar'})">
                <IconCalendar class="w-4 h-4"/>
                <p>Event</p>
            </div>
        </div>
        <div class="w-full flex justify-center absolute bottom-10 mb-4">
            <div class="w-[80%]">
                <ButtonCustom :text="'Keluar'" class="bg-transparent border border-white text-white" @click="logoutAdmin"/>
            </div>
        </div>
    </div>
</template>