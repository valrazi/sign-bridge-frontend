<script setup lang="ts">
const {adminSidebar} = storeToRefs(useUserStore())
</script>
<template>
    <div class="w-full min-h-dvh bg-primary flex">
        <SidebarAdmin v-if="adminSidebar"/>
        <div class="flex-1">
            <AdminNavbar/>
            <RouterView/>
        </div>
    </div>
</template>