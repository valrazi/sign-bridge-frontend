<script setup lang="ts">
import { CalendarAddRequest } from '@/types';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ElNotification } from 'element-plus';

const { setLoading, removeLoading } = useLoaderStore()
const payload = ref<CalendarAddRequest>({
    color: '',
    eventDate: '',
    title: '',
    description: ''
})
const rules = {
    color: { required },
    eventDate: { required },
    title: { required }
}
const v$ = useVuelidate(rules, payload.value)

const props = defineProps<{
    visible: boolean
}>()
const emit = defineEmits(['closeAdd'])
const show = ref<boolean>(false)
watch(() => props.visible, () => {
    show.value = props.visible
})
const closeModal = () => {
    emit('closeAdd')
}
const submit = async () => {
    v$.value.$touch()
    if (!v$.value.$invalid) {
        try {
            setLoading()
            const response = await apiCalendarCreate(payload.value)
            if (!response.error) {
                ElNotification({
                    type: 'success',
                    message: 'Create event Success',
                    title: 'Success'
                })
                closeModal()
            } else {
                ElNotification({
                    type: 'error',
                    message: 'Create event Failed',
                    title: 'Failed'
                })
            }
        } catch (error) {
            console.log(error)
            ElNotification({
                type: 'error',
                message: 'Create event Failed',
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
        <el-dialog v-model="show" align-center :show-close="false" width="50" @close="closeModal">
            <div class="w-full flex flex-col justify-center items-center text-black gap-y-4">
                <h1 class="text-[1.2rem] underline font-bold">Tambah Event</h1>
                <div class="w-[80%] flex flex-col gap-y-2">
                    <label for="">Nama Event</label>
                    <input v-model="payload.title" type="text" class="bg-white border border-black p-2 rounded-xl"
                        placeholder="Tulis Disini">
                    <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="w-[80%] flex flex-col gap-y-2">
                    <label for="">Jenis Event</label>
                    <select v-model="payload.color" class="bg-white border border-black p-2 rounded-xl">
                        <option value="" selected disabled>--Jenis Event--</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                    </select>
                    <div class="input-errors" v-for="error of v$.color.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="w-[80%] flex flex-col gap-y-2">
                    <label for="">Tanggal Event</label>
                    <input v-model="payload.eventDate" type="date" class="bg-white border border-black p-2 rounded-xl"
                        placeholder="Tulis Disini">
                    <div class="input-errors" v-for="error of v$.eventDate.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="w-[80%] flex flex-col gap-y-2">
                    <label for="">Deskripsi Event</label>
                    <textarea v-model="payload.description" class="bg-white border border-black rounded-xl p-2"
                        rows="5"></textarea>
                </div>
                <div class="w-[50%]">
                    <ButtonCustom :text="'Simpan'" class="bg-secondary-200" @click="submit" />
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style>
.el-dialog {
    background-color: #EEE9DA;
    padding: 1rem;
    min-height: 70dvh;
    border-radius: 0.75rem;
    min-width: 50%;
    border: 2px solid black;
}

.el-dialog__header {
    display: none;
}
</style>