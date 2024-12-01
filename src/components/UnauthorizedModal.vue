<script setup lang="ts">
const {unauthorizedModal, isModal} = storeToRefs(useUserStore())
const router = useRouter()
const changePage = (name: 'register' | 'login') => {
    unauthorizedModal.value = false
    if(name == 'register') {
        router.push({name})
    }else {
        isModal.value = true
    }
}
</script>
<template>
    <div>
        <el-dialog :show-close="false" width="50%" v-model="unauthorizedModal">
            <div class="w-full min-h-[50dvh] p-4 flex flex-col justify-between items-center gap-4 h-full rounded-xl bg-white shadow-lg">
                <h1 class="font-bold text-[36px]">Pemberitahuan!</h1>
                <h2 class="text-center w-[80%]">Silahkan masuk ke  akun kamu  terlebih dahulu untuk bisa 
                    mengakses Fitur Video Pembelajaran ini!</h2>
                <img src="@/assets/img/logo.png" class="w-40" alt="">
                <div class="w-full flex justify-center gap-x-2">
                    <div class="w-1/3">
                        <ButtonCustom @click="changePage('register')" :text="'Daftar'" class="bg-secondary-200" />
                    </div>
                    <div class="w-1/3">
                        <ButtonCustom @click="changePage('login')" :text="'Masuk'" class="bg-secondary-200"/>
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