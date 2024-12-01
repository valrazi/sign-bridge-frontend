<script setup lang="ts">
import { BlogAddPayload } from '@/types';
import Compressor from 'compressorjs'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ElNotification } from 'element-plus';
const { setLoading, removeLoading } = useLoaderStore()
const router = useRouter()
const payload = ref<BlogAddPayload>({
    backgroundImage: '',
    content: '',
    title: ''
})
const rules = {
    backgroundImage: { required },
    content: { required },
    title: { required }
}
const v$ = useVuelidate(rules, payload.value)

const originalFile = ref<File | null>(null);
const thumbnail = ref<string | null>(null)
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        originalFile.value = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnail.value = reader.result as string; // Set the thumbnail as base64
        };

        // Compress the image
        new Compressor(file, {
            quality: 0.6, // Adjust quality as needed (0 to 1)
            success(result) {
                const reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = () => {
                    payload.value.backgroundImage = reader.result as string; // Set the compressed image as base64
                };
            },
            error(err) {
                console.error('Compression error:', err);
            },
        });
    }
};

const submit = async () => {
    v$.value.$touch()
    if (!v$.value.$invalid) {
        setLoading()
        try {
            const media = await apiMediaUpload(payload.value.backgroundImage)
            const response = await apiBlogAdd({
                title: payload.value.title,
                content: payload.value.content,
                backgroundImage: media.data
            })
            if (!response.error) {
                ElNotification({
                    title: 'success',
                    message: 'Blog Added Succesfully!',
                    type: 'success'
                })
                router.push({name:'admin-blog'})
            } else {
                ElNotification({
                    title: 'failed',
                    message: 'Blog Added Failed!',
                    type: 'error'
                })
            }
        } catch (error) {
            console.log(error)
            ElNotification({
                title: 'failed',
                message: 'Blog Added Failed!',
                type: 'error'
            })
        } finally {
            removeLoading()
        }
    }
}
</script>
<template>
    <div class="w-full p-4">
        <button @click="router.go(-1)">
            <IconBack />
        </button>
    </div>
    <div class="w-full flex flex-col justify-center items-center gap-y-4 py-8">
        <h1 class="text-[1.2rem] font-bold underline">Tambah Blog</h1>

        <div class="w-[60%] flex flex-col gap-y-4">
            <p>Background</p>
            <input type="file" name="background-blog" id="background-blog" class="hidden" @change="handleFileChange">
            <label :style="{
                backgroundImage: `url(${thumbnail})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',

            }" for="background-blog"
                class="h-[30dvh] w-full flex justify-center items-center border border-black bg-white rounded-xl">
                <IconAdd />
            </label>
            <div class="input-errors" v-for="error of v$.backgroundImage.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div class="w-[60%] flex flex-col gap-y-2">
            <p>Judul</p>
            <input v-model="payload.title" type="text" class="py-2 rounded-xl border border-black">
            <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div class="w-[60%] flex flex-col gap-y-2">
            <p>Deskripsi</p>
            <textarea v-model="payload.content" rows="10"
                class="p-2 rounded-xl border border-black">Tulis Disini</textarea>
            <div class="input-errors" v-for="error of v$.content.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div class="w-1/3">
            <ButtonCustom :text="'Simpan'" class="bg-secondary-200" @click="submit" />
        </div>
    </div>
</template>