<script setup lang="ts">
import { UserRegisterPayload } from '@/types';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ElNotification } from 'element-plus';
const {setLoading, removeLoading} = useLoaderStore()
const router = useRouter()
const passwordVisibility = ref<boolean>(false)

const form = ref<UserRegisterPayload>({
    fullName: '',
    dateBirth: '',
    email: '',
    password: '',
    phoneNumber: '',
    placeBirth: '',
    securityAnswer: '',
    securityQuestion: ''
})
const rules = {
    fullName: { required },
    dateBirth: { required },
    email: { required, email },
    password: { required },
    phoneNumber: { required },
    placeBirth: { required },
    securityAnswer: { required },
    securityQuestion: { required }
}
const v$ = useVuelidate(rules, form.value)

const register = async () => {
    v$.value.$touch()
    if(!v$.value.$invalid) {
        setLoading()
        try {
            const response = await apiUserRegister(form.value)
            if(!response.error) {
                ElNotification({
                    type: 'success',
                    message: 'Register Success',
                    title: 'Success'
                })
                router.push({name:'home'})
            }else {
                console.log(response.error)
                ElNotification({
                    type: 'error',
                    message: 'Register Failed: ' + response.error,
                    title: 'Failed'
                })
            }
        } catch (error) {
            console.log(error)
            ElNotification({
                    type: 'error',
                    message: 'Register Failed',
                    title: 'Failed'
                })
        } finally {
            removeLoading()
        }
    }
}



onMounted(() => {
    
})
</script>
<template>
    <div class="w-full flex">
        <div class="w-1/2 min-h-[100dvh] max-h-[100dvh]" style="
        background-image: url('https://pub-1d32d4ccfc5d47758db60374c9329a3a.r2.dev/Animasi%20Register%20%26%20Forgot%20Password.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;">
        </div>
        <div class="w-1/2 min-h-[100dvh] max-h-[100dvh] overflow-y-scroll bg-white flex flex-col items-center py-8 gap-2">
            <img src="@/assets/img/logo.png" alt="" class="w-28 hover:cursor-pointer"
                @click="router.push({ name: 'home' })">
            <div class="w-[70%] mb-4">
                <h1 class="text-[2rem] font-bold">Daftar</h1>
                <h2 class="text-[1rem]">Lengkapi form data dibawah ini dengan benar </h2>
            </div>
            <div class="w-[65%] flex flex-col">
                <label for="">Nama Lengkap</label>
                <input 
                    v-model="form.fullName"
                    type="text"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                <div class="input-errors" v-for="error of v$.fullName.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="w-[65%] flex flex-col">
                <label for="">Email</label>
                <input type="email" v-model="form.email"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="w-[65%] flex flex-col">
                <label for="">Tempat Lahir</label>
                <input type="text" v-model="form.placeBirth"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                <div class="input-errors" v-for="error of v$.placeBirth.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="w-[65%] flex flex-col">
                <label for="">Tanggal Lahir</label>
                <input type="date" v-model="form.dateBirth"
                    class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                <div class="input-errors" v-for="error of v$.dateBirth.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="w-[65%] flex flex-col">
                <label for="">No. Telepon</label>
                <div class="flex gap-x-2 w-full">
                    <div class="w-1/5">
                        <ButtonCustom :text="'+62'" class="bg-gray-100 text-black" />
                    </div>
                    <input type="text" v-model="form.phoneNumber"
                        class="p-2 w-full rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                </div>
                <div class="input-errors" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
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
                <ButtonCustom :text="'Daftar'" class="bg-secondary-200 font-bold" @click="register"/>
            </div>
        </div>
    </div>
</template>