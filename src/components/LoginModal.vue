<script setup lang="ts">
import { UserLoginPayload } from '@/types';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ElNotification } from 'element-plus';
const { isModal } = storeToRefs(useUserStore())
const {setLoading, removeLoading} = useLoaderStore()
const {token, user} = storeToRefs(useAuthStore())
const closeModal = () => {
    isModal.value = false
}
const passwordVisible = ref<boolean>(false)
const router = useRouter()

const form = ref<UserLoginPayload>({
    email: '',
    password: ''
})

const rules = {
    email: { required, email },
    password: { required }
}

const v$ = useVuelidate(rules, form.value)

const login = async () => {
    v$.value.$touch()
    if (!v$.value.$invalid) {
        setLoading()
        try {
            const response = await apiUserLogin(form.value.email, form.value.password)
            if (!response.error) {
                ElNotification({
                    type: 'success',
                    message: 'Login Success',
                    title: 'Success'
                })
                token.value = response.data.token
                user.value = response.data.user
                closeModal()
            } else {
                console.log(response.error)
                ElNotification({
                    type: 'error',
                    message: 'Login Failed: ' + response.error,
                    title: 'Failed'
                })
            }
        } catch (error) {
            console.log(error)
            ElNotification({
                type: 'error',
                message: 'Login Failed',
                title: 'Failed'
            })
        } finally {
            removeLoading()
        }
    }
}
</script>
<template>
    <div>
        <el-dialog v-model="isModal" :show-close="false" width="50%">
            <div class="w-full flex h-full rounded-xl">
                <div class="w-1/2 h-[70dvh] bg-cover bg-center rounded-tl-xl rounded-bl-xl"
                    style="background-image: url('https://pub-1d32d4ccfc5d47758db60374c9329a3a.r2.dev/Animasi%20Login.jpg');">

                </div>
                <div class="w-1/2 bg-white h-[70dvh] rounded-tr-xl rounded-br-xl">
                    <div class="w-full flex justify-end p-4">
                        <button @click="closeModal"
                            class="rounded-full w-8 h-8 border font-bold bg-secondary-200 text-white">x</button>
                    </div>
                    <div class="p-4 flex flex-col gap-y-4">
                        <h1 class="font-bold text-[1rem] my-4">Masuk</h1>

                        <div class="flex flex-col w-full">
                            <label for="">Email</label>
                            <input type="email" class="border-2 border-secondary-100 rounded-lg p-1"
                                v-model="form.email">
                            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="flex flex-col w-full relative">
                            <label for="">Password</label>
                            <input :type="!passwordVisible ? 'password' : 'text'"
                                class="border-2 border-secondary-100 rounded-lg p-1" v-model="form.password">
                            <button class="absolute right-2 top-5" @click="passwordVisible = !passwordVisible">
                                <IconVisible v-if="!passwordVisible" class="w-5" />
                                <IconInvisible v-else class="w-5" />
                            </button>
                            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                            <div class="w-full flex justify-end">
                                <span class="hover:cursor-pointer"
                                    @click="router.push({ name: 'forgot-password' })">Lupa
                                    Kata Sandi</span>
                            </div>
                        </div>

                        <div class="flex flex-col gap-y-4">
                            <ButtonCustom :text="'Masuk'" class="bg-secondary-200 text-black" @click="login"/>
                            <ButtonCustom :text="'Buat Akun Baru'" class="bg-gray-200 text-black" />
                        </div>
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