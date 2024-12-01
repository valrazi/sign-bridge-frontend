<script setup lang="ts">
const navItems = [
    {
        name: 'Home',
        route: 'home',
    },
    {
        name: 'Kamus BIS',
        route: 'kamus-bis',
    },
    {
        name: 'Video Pembelajaran',
        route: 'video-learning',
        needAuth: true
    },
    {
        name: 'Blog',
        route: 'blog',
    },
    {
        name: 'Job Seeking',
        route: 'job-seeking',
    },
    {
        name: 'Shop',
        route: 'shop',
    },
]
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(useAuthStore())
const dropdownActive = ref<boolean>(false)
const changePage = (name: string) => {
    dropdownActive.value = false
    router.push({name})
}
const {showLogout} =useUserStore()
const changeRoute = (index: number) =>{
    const route = navItems.at(index)!
    router.push(route.route)
}
</script>
<template>
    <div class="w-full py-2 px-12 bg-transparent flex justify-between">
        <img src="@/assets/img/logo.png" alt="" class="w-20">
        <div class="flex gap-x-4 text-sm cursor-pointer items-center">
            <button :class="{ 'bg-secondary-100 shadow-md': route.name == i.route }"
                class="text-sm h-fit py-2 px-4 rounded-xl font-bold hover:cursor-pointer" @click="changeRoute(idx)"
                v-for="(i, idx) in navItems">
                {{ i.name }}
            </button>
        </div>
        <div class="flex gap-x-4 items-center" v-if="!user">
            <button @click="router.push({ name: 'register' })"
                class="bg-white text-sm font-bold h-fit py-2 px-4 rounded-xl hover:cursor-pointer shadow-md">Daftar</button>
            <button @click="userStore.showModal"
                class="bg-secondary-200 text-sm font-bold h-fit py-2 px-4 rounded-xl hover:cursor-pointer shadow-md">Masuk</button>
        </div>
        <div class="flex items-center" v-else-if="user && user.roleId == 3">
            <div class="relative hover:cursor-pointer">
                <button class="w-fit px-4 py-1 rounded-xl text-black text-center bg-secondary-200 flex items-center"
                @click="dropdownActive = !dropdownActive">
                    <span>{{ user?.fullName }}</span>
                    <IconDown class="w-4 h-4" />
                </button>
                <div class="absolute flex flex-col gap-y-2 top-10 w-full" v-if="dropdownActive">
                    <button
                    @click="changePage('profile')"
                        class=" w-full px-2 py-1 text-sm rounded-xl text-black text-center bg-white">
                        <span>Akun Saya</span>
                    </button>
                    <button
                    @click="showLogout"
                        class=" w-full px-2 py-1 text-sm rounded-xl text-black text-center bg-white">
                        <span>Keluar</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex items-center" v-else-if="user && user.roleId != 3">
            <div class="relative hover:cursor-pointer">
                <button class="w-fit px-4 py-1 rounded-xl text-black text-center bg-secondary-200 flex items-center"
                @click="router.push({name: 'admin-home'})">
                    <span>{{ user?.email }}</span>
                </button>
            </div>
        </div>
    </div>
</template>