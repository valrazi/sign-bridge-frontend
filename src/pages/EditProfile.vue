<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, } from '@vuelidate/validators'
import { ElNotification } from 'element-plus';
import { computed } from 'vue'
const { user } = storeToRefs(useAuthStore())
const { setLoading, removeLoading } = useLoaderStore()
const userUpdatePayload = ref({
    fullName: user.value?.fullName!,
    email: user.value?.email!,
    phoneNumber: user.value?.phoneNumber!
})
const rules = {
    fullName: { required },
    email: { required, email },
    phoneNumber: { required }
}
const v$Info = useVuelidate(rules, userUpdatePayload.value)
const updateUser = async () => {
    v$Info.value.$touch()
    if (!v$Info.value.$invalid) {
        setLoading()
        try {
            const { fullName, phoneNumber } = userUpdatePayload.value
            const response = await apiUserUpdate(fullName, user.value?.email!, phoneNumber)
            if (!response.error) {
                ElNotification({
                    type: 'success',
                    message: 'Update Success',
                    title: 'Success'
                })
                user.value = response.data
            } else {
                console.log(response.error)
                ElNotification({
                    type: 'error',
                    message: 'Update Failed: ' + response.error,
                    title: 'Failed'
                })
            }
        } catch (error) {
            console.log(error)
            ElNotification({
                type: 'error',
                message: 'Update Failed',
                title: 'Failed'
            })
        } finally {
            removeLoading()
        }
    }
}

const formPassword = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})
const rulesPassword = {
    oldPassword: { required },
    newPassword: { required },
    confirmPassword: { required, sameAs: sameAs(computed(() => formPassword.value.newPassword)) }
}

const v$Pass = useVuelidate(rulesPassword, formPassword.value)

const changePassword = async () => {
    v$Pass.value.$touch()
    if (!v$Pass.value.$invalid) {
        setLoading()
        try {
            const response = await apiUserChangePassword(formPassword.value.oldPassword, formPassword.value.newPassword)
            if (!response.error) {
                ElNotification({
                    type: 'success',
                    message: 'Password Change Success',
                    title: 'Success'
                })
                window.location.reload()
            } else {
                console.log(response.error)
                ElNotification({
                    type: 'error',
                    message: 'Password Change Failed: ' + response.error,
                    title: 'Failed'
                })
            }
        } catch (error) {
            console.log(error)
            ElNotification({
                type: 'error',
                message: 'Password Change Failed',
                title: 'Failed'
            })
        } finally {
            removeLoading()
        }
    }
}
</script>
<template>
    <h1 class="text-[2rem] font-bold text-center">Akun Saya</h1>
    <p class="text-center">Edit data kamu jika dibutuhkan sebuah pembaruan data milik kamu</p>
    <div class="w-full flex justify-center">
        <div class="w-[80%] flex justify-center gap-x-4 my-8">
            <div class="w-1/2 min-h-[60dvh] bg-white rounded-xl p-4 gap-4">
                <h1 class="text-[1.5rem] font-bold">Edit Profil</h1>
                <h2>Silahkan Ubah Data Diri Kamu</h2>

                <div class="my-4 flex flex-col w-full">
                    <label for="">Nama Lengkap</label>
                    <input type="text" v-model="userUpdatePayload!.fullName"
                        class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                    <div class="input-errors" v-for="error of v$Info.fullName.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>

                <div class="my-4 flex flex-col w-full">
                    <label for="">Email</label>
                    <input type="email" disabled v-model="userUpdatePayload!.email"
                        class="p-2 rounded-xl bg-gray-300 border border-transparent ">
                    <div class="input-errors" v-for="error of v$Info.email.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="">No. Telepon</label>
                    <div class="flex gap-x-2 w-full">
                        <div class="w-1/5">
                            <ButtonCustom :text="'+62'" class="bg-gray-100 text-black" />
                        </div>
                        <input type="text" v-model="userUpdatePayload!.phoneNumber"
                            class="p-2 w-full rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                        <div class="input-errors" v-for="error of v$Info.phoneNumber.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                </div>

                <ButtonCustom :text="'Simpan Profil Saya'" class="bg-secondary-200 my-8" @click="updateUser" />
            </div>

            <div class="w-1/2 min-h-[60dvh] bg-white rounded-xl p-4 gap-4">
                <h1 class="text-[1.5rem] font-bold">Edit Kata Sandi</h1>
                <h2>Silahkan Ubah Kata Sandi Kamu</h2>

                <div class="my-4 flex flex-col w-full">
                    <label for="">Kata Sandi Lama</label>
                    <input type="text" v-model="formPassword.oldPassword"
                        class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                    <div class="input-errors" v-for="error of v$Pass.oldPassword.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>

                <div class="my-4 flex flex-col w-full">
                    <label for="">Kata Sandi Baru</label>
                    <input type="text" v-model="formPassword.newPassword"
                        class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                    <div class="input-errors" v-for="error of v$Pass.newPassword.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>

                <div class="my-4 flex flex-col w-full">
                    <label for="">Konfirmasi Kata Sandi Baru</label>
                    <input type="text" v-model="formPassword.confirmPassword"
                        class="p-2 rounded-xl bg-gray-100 border border-transparent hover:border-secondary-200">
                    <div class="input-errors" v-for="error of v$Pass.confirmPassword.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>

                <ButtonCustom :text="'Perbarui'" class="bg-secondary-200 my-4" @click="changePassword" />
            </div>
        </div>
    </div>
</template>