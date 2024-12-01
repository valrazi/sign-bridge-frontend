<script setup lang="ts">
const {isModal, logoutModal, unauthorizedModal} = storeToRefs(useUserStore())
</script>
<template>
    <div class="w-full min-h-dvh bg-primary">
        <LayoutNavbar/>
        <RouterView/>
        <LoginModal v-if="isModal"/>
        <LogoutModal v-if="logoutModal"/>
        <UnauthorizedModal v-if="unauthorizedModal"/>
    </div>
</template>