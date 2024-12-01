<script setup lang="ts">
const {user} = storeToRefs(useAuthStore())
const {adminSidebar} = storeToRefs(useUserStore())
</script>
<template>
    <div class="w-full flex items-center justify-between px-4 py-[0.7rem] border-b-2 border-white">
        <div class="flex gap-x-4 justify-center items-center">
            <IconHamburger @click="adminSidebar = !adminSidebar" class="hover:cursor-pointer"/>
            <img src="@/assets/img/logo.png" class="w-12" alt="">
        </div>
        <div class="w-[15%]">
            <ButtonCustom :text="user?.email!" class="bg-secondary-200 text-xs"/>
        </div>
    </div>
</template>