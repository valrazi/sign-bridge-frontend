<script setup lang="ts">
import router from '@/core/router';

const {logoutModal} = storeToRefs(useUserStore())
const authStore = useAuthStore()
const logout = () => {
    router.push({name:'home'})
    logoutModal.value = false
    authStore.logout()
}
const cancel = () => logoutModal.value = false
</script>
<template>
    <div>
        <el-dialog :show-close="false" width="50%" v-model="logoutModal">
            <div class="w-full min-h-[50dvh] p-4 flex flex-col justify-between items-center gap-4 h-full rounded-xl bg-white shadow-lg">
                <h1>Keluar</h1>
                <h2>Apakah kamu yakin ingin keluar dari Website <b>SignBridge?</b></h2>
                <img src="@/assets/img/logo.png" class="w-40" alt="">
                <div class="w-full flex gap-x-2">
                    <div class="w-1/2">
                        <ButtonCustom @click="logout" :text="'Keluar'" class="bg-secondary-200" />
                    </div>
                    <div class="w-1/2">
                        <ButtonCustom @click="cancel" :text="'Tetap Disini'" class="bg-secondary-200"/>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style>
.el-dialog {
    background-color: red;
    padding: 0;
    min-height: 50dvh;
    border-radius: 0.75rem
}

.el-dialog__header {
    display: none;
}
</style>