<script setup lang="ts">
import { Blog } from '@/types';
import { ElNotification } from 'element-plus';
import moment from 'moment';
const router = useRouter()
const { setLoading, removeLoading } = useLoaderStore()
const blogs = ref<Blog[]>([])
const totalData = ref<number>(0)
const page = ref<number>(1)
const getData = async () => {
    try {
        setLoading()
        const response = await apiBlogAll({ limit: 5, page: page.value })
        if (!response.error) {
            blogs.value = response.data.rows.map((b) => {
                b.createdAt = moment(b.createdAt).format('DD MMM YYYY')
                return b
            })
            totalData.value = response.data.meta.total
        }
    } catch (error) {
        console.log(error)
    } finally {
        removeLoading()
    }
}

const changePage = (pageNow: number) => {
    page.value = pageNow
    getData()
}

const deleteData = (id: string) => {
    useSwal()
        .fire({
            title: 'Hapus',
            text: 'Apakah kamu yakin ingin menghapus blog ini?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#EEE9DA',
            confirmButtonColor: '#6096B4'
        })
        .then(async (res) => {
            if (res.isConfirmed) {
                try {
                    setLoading()
                    const response = await apiBlogDelete(id)
                    if (!response.error) {
                        ElNotification({
                            title: 'Success',
                            message: 'Blog deleted succesfully',
                            type: 'success'
                        })
                    } else {
                        ElNotification({
                            title: 'Failed',
                            message: 'Blog deleted failed',
                            type: 'error'
                        })
                    }
                } catch (error) {
                    console.log(error)
                    ElNotification({
                        title: 'Failed',
                        message: 'Blog deleted failed',
                        type: 'error'
                    })
                } finally {
                    removeLoading()
                    page.value = 1
                    getData()
                }
            }
        })
}
onMounted(() => {
    getData()
})
</script>
<template>
    <div class="w-full p-8 flex justify-between">
        <h1 class="text-[1.5rem] font-bold">Blog</h1>
        <div class="w-1/5">
            <ButtonCustom :text="'Tambah Blog +'" class="bg-secondary-200"
                @click="router.push({ name: 'admin-blog-add' })" />
        </div>
    </div>
    <div class="w-full flex justify-center py-8">
        <div class="w-[90%] overflow-x-scroll">
            <table class="w-full bg-red-50 text-sm text-left table-auto">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-6 rounded-tl-xl text-center">
                            Background
                        </th>
                        <th scope="col" class="px-6 py-6 text-center">
                            Judul
                        </th>
                        <th scope="col" class="px-6 py-6 text-center">
                            Penulis
                        </th>
                        <th scope="col" class="px-6 py-6 text-center">
                            Tgl Rilis
                        </th>
                        <th scope="col" class="px-6 py-6 rounded-tr-xl text-center">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="b in blogs">
                        <th scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex justify-center">
                            <img :src="b.backgroundImage" class="w-[210px] rounded-xl" alt="">
                        </th>
                        <td class="px-6 py-4">
                            <div class="w-full flex justify-start">
                                <p class="text-xs bg-primary p-4 rounded-xl w-full">
                                    {{ b.title }}
                                </p>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="w-full flex justify-start">
                                <p class="text-xs bg-primary p-4 rounded-xl w-full">
                                    {{ b.User.email }}
                                </p>
                            </div>
                        </td>
                        <td class="px-6 w-1/5 py-4 ">
                            <div class="w-full flex justify-start">
                                <p class="text-xs bg-primary p-4 rounded-xl w-full">
                                    {{ b.createdAt }}
                                </p>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <ButtonCustom :text="'Edit Blog'" class="bg-secondary-200 mb-2 text-white"
                                @click="router.push('/admin/blog-edit?id=' + b.id)" />
                            <ButtonCustom :text="'Hapus'" class="bg-red-500 text-white" @click="deleteData(b.id)" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="w-full flex justify-center  p-8">
        <div class="w-[80%] flex justify-center">
            <el-pagination layout="prev, pager, next" :total="totalData" :default-page-size="5" @change="changePage" />
        </div>
    </div>
</template>
