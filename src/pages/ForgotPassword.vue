<script setup lang="ts">
import { UserForgotPasswordPayload } from '@/types';

import { useVuelidate } from '@vuelidate/core'
import {  email, requiredIf, sameAs } from '@vuelidate/validators'
import { ElNotification } from 'element-plus';
const {setLoading, removeLoading} = useLoaderStore()
const router = useRouter()
const passwordVisibility = ref<boolean>(false)
const step = ref<number>(1)
const form = ref<UserForgotPasswordPayload & { confirmPassword: string }>({
    email: '',
    password: '',
    securityAnswer: '',
    securityQuestion: '',
    confirmPassword: ''
})
const rules = {
    email: { requiredIf: requiredIf(computed(() => step.value == 1)), email },
    securityQuestion: { requiredIf: requiredIf(computed(() => step.value == 1)) },
    securityAnswer: { requiredIf: requiredIf(computed(() => step.value == 1)) },
    password: { requiredIf: requiredIf(computed(() => step.value == 2)) },
    confirmPassword: { requiredIf: requiredIf(computed(() => step.value == 2)), sameAs: sameAs(computed(() => form.value.password)) },
}
const v$ = useVuelidate(rules, form.value)

const nextStep = () => {
    v$.value.$touch()
    if(!v$.value.$invalid) {
        step.value = 2
    }
}

const submit = async () => {
    v$.value.$touch()
    if(!v$.value.$invalid) {
        setLoading()
        try {
            const response = await apiUserForgotPassword({
                ...form.value
            })
            if (!response.error) {
                ElNotification({
                    type: 'success',
                    message: 'Forgot Password Success',
                    title: 'Success'
                })
                router.push({name:'home'})
            } else {
                console.log(response.error)
                ElNotification({
                    type: 'error',
                    message: 'Forgot Password Failed: ' + response.error,
                    title: 'Failed'
                })
            }
        } catch (error) {
            console.log(error)
            ElNotification({
                type: 'error',
                message: 'Forgot Password Failed',
                title: 'Failed'
            })
        } finally {
            removeLoading()
        }
    }
}
</script>
<template>
    <div class="w-full flex">
        <div class="w-1/2 min-h-dvh" style="
        background-image: url('https://pub-1d32d4ccfc5d47758db60374c9329a3a.r2.dev/Animasi%20Register%20%26%20Forgot%20Password.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;">
        </div>
        <div class="w-1/2 min-h-dvh bg-white flex flex-col items-center py-8 gap-2" v-if="step == 1">
            <img src="@/assets/img/logo.png" alt="" class="w-28 hover:cursor-pointer"
                @click="router.push({ name: 'home' })">
            <div class="w-[70%] mb-4">
                <h1 class="text-[2rem] font-bold">Lupa Kata Sandi</h1>
                <h2 class="text-[1rem]">Masukkan Email Kamu yang sudah terdaftar!</h2>
            </div>
            <div class="w-[65%] flex flex-col">
                <label for="">Email</label>
                <input type="text" v-model="form.email"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="w-[65%] flex flex-col">
                <label for="">Pertanyaan Keamanan</label>
                <select name="" id="" v-model="form.securityQuestion"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200 mb-2">
                    <option value="" selected disabled>Pilih Pertanyaan</option>
                    <option value="pet">Apa Nama Hewan Peliharaan Pertama Anda?</option>
                    <option value="teacher">Apa Nama Guru Pertama Anda?</option>
                    <option value="school">Apa Nama Sekolah Pertama Anda?</option>
                </select>
                <div class="input-errors" v-for="error of v$.securityQuestion.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
                <input type="text" placeholder="Masukkan Jawaban" v-model="form.securityAnswer"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                <div class="input-errors" v-for="error of v$.securityAnswer.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="w-[65%]">
                <ButtonCustom :text="'Selanjutnya'" class="bg-secondary-200 font-bold" @click="nextStep" />
            </div>
        </div>
        <div class="w-1/2 min-h-dvh bg-white flex flex-col items-center py-8 gap-2" v-if="step == 2">
            <img src="@/assets/img/logo.png" alt="" class="w-28 hover:cursor-pointer"
                @click="router.push({ name: 'home' })">
            <div class="w-[70%] mb-4">
                <h1 class="text-[2rem] font-bold">Kata Sandi Baru</h1>
                <h2 class="text-[1rem]">Masukkan Kata Sandi Kamu yang baru! </h2>
            </div>
            <div class="w-[65%] flex flex-col relative">
                <label for="">Kata Sandi</label>
                <input :type="!passwordVisibility ? 'password' : 'text'" v-model="form.password"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                <div @click="passwordVisibility = !passwordVisibility">
                    <IconVisible class="w-5 h-5 absolute right-4 top-9" v-if="!passwordVisibility" />
                    <IconInvisible class="w-5 h-5 absolute right-4 top-9" v-else />
                </div>
                <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="w-[65%] flex flex-col relative">
                <label for="">Konfirmasi Kata Sandi</label>
                <input :type="!passwordVisibility ? 'password' : 'text'" v-model="form.confirmPassword"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                <div @click="passwordVisibility = !passwordVisibility">
                    <IconVisible class="w-5 h-5 absolute right-4 top-9" v-if="!passwordVisibility" />
                    <IconInvisible class="w-5 h-5 absolute right-4 top-9" v-else />
                </div>
                <div class="input-errors" v-for="error of v$.confirmPassword.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="w-[65%]">
                <ButtonCustom :text="'Simpan Kata Sandi'" class="bg-secondary-200 font-bold" @click="submit" />
            </div>
        </div>
    </div>
</template>