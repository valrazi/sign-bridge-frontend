<script setup lang="ts">
import { UserLoginPayload } from '@/types';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ElNotification } from 'element-plus';
const { setLoading, removeLoading } = useLoaderStore()
const { token, user } = storeToRefs(useAuthStore())
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
                router.push({name:'admin-home'})
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
    <div class="w-full min-h-dvh flex justify-center items-center bg-primary">
        <div
            class="w-1/4 min-h-[60dvh] bg-secondary-200 p-4 flex flex-col items-center justify-center font-bold rounded-tl-xl rounded-bl-xl shadow-md">
            <h1 class="text-[2rem] text-white">SignBridge</h1>
            <img src="@/assets/img/admin-login.png" class="w-[90%]" alt="">
        </div>
        <div
            class="w-1/4 min-h-[60dvh] bg-white p-4 flex flex-col gap-4 items-center rounded-tr-xl rounded-br-xl shadow-md">
            <img src="@/assets/img/logo.png" class="w-28" alt="">
            <h1 class="text-[1.5rem] font-bold">Masuk Admin</h1>
            <div class="flex flex-col w-full">
                <label for="">Email</label>
                <input type="email" class="border-2 border-secondary-100 rounded-lg p-1" v-model="form.email">
                <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="flex flex-col w-full relative">
                <label for="">Password</label>
                <input :type="!passwordVisible ? 'password' : 'text'"
                    class="border-2 border-secondary-100 rounded-lg p-1" v-model="form.password">
                <button class="absolute right-2 top-6" @click="passwordVisible = !passwordVisible">
                    <IconVisible v-if="!passwordVisible" class="w-5" />
                    <IconInvisible v-else class="w-5" />
                </button>
                <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="flex flex-col gap-y-4 w-full">
                <ButtonCustom :text="'Masuk'" class="bg-secondary-200 text-black" @click="login" />
            </div>
        </div>
    </div>
</template>