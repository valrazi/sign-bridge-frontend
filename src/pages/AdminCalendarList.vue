<script setup lang="ts">
import { ElNotification } from "element-plus";
const { setLoading, removeLoading } = useLoaderStore()
import moment from "moment";
import { Qalendar } from "qalendar";
const calendarEvent = ref<any[]>([])
const calendarConfig = {
    week: {
        // Takes the value 'sunday' or 'monday'
        // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
        startsOn: 'monday',
        // Takes the values 5 or 7.
        nDays: 7,
        // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
        // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
        scrollToHour: 5,
    },
    month: {
        // Hide leading and trailing dates in the month view (defaults to true when not set)
        showTrailingAndLeadingDates: false,
    },
    locale: 'id-ID',
    defaultMode: 'month',
    // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
    isSilent: true,
    showCurrentTime: true,
    style: {
        colorSchemes: {
            work: {
                color: '#fff',
                backgroundColor: '#6096b4',
            },
            personal: {
                color: '#fff',
                backgroundColor: '#a83232',
            }
        }
    }
}
const getData = async () => {
    try {
        setLoading()
        const response = await apiCalendarAll()
        if (!response.error) {
            calendarEvent.value = response.data.map((c) => {
                const timeFormatted = moment(c.eventDate).format('YYYY-MM-DD')
                const eventFormatted = {
                    title: c.title,
                    with: c.User.email,
                    time: { start: timeFormatted, end: timeFormatted },
                    colorScheme: c.color,
                    isEditable: true,
                    id: c.id,
                    description: c.description
                }
                return eventFormatted
            })
        }
    } catch (error) {
        console.log(error)
    } finally {
        removeLoading()
    }
}

const deleteEvent = (id: string) => {
    useSwal()
        .fire({
            title: 'Hapus',
            text: 'Apakah kamu yakin ingin menghapus event ini?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#EEE9DA',
            confirmButtonColor: '#6096B4'
        })
        .then(async (res) => {
            if (res.isConfirmed) {
                try {
                    setLoading()
                    const response = await apiCalendarDelete(id)
                    if (!response.error) {
                        ElNotification({
                            title: 'Success',
                            message: 'Delete event succes!',
                            type: 'success'
                        })
                        getData()
                    } else {
                        ElNotification({
                            title: 'Failed',
                            message: 'Delete event failed!',
                            type: 'error'
                        })
                    }
                } catch (error) {
                    console.log(error)
                    ElNotification({
                        title: 'Failed',
                        message: 'Delete event failed!',
                        type: 'error'
                    })
                } finally {
                    removeLoading()
                }
            }
        })
}

const createPopup = ref<boolean>(false)
const showAdd = () => {
    createPopup.value = true
}
const closeAdd = () => {
    createPopup.value = false
    getData()
}
const editPopup = ref<boolean>(false)
const popupId = ref<string | null>(null)
const showEdit = (id:string) => {
    popupId.value = id
    editPopup.value = true
}
const closeEdit = () => {
    editPopup.value = false
    getData()
}
onMounted(() => {
    getData()
})
</script>
<template>
    <AdminEventAdd :visible="createPopup" @close-add="closeAdd" />
    <AdminEventEdit :visible="editPopup" :id="popupId" @close-edit="closeEdit" />
    <div class="w-full p-8 flex justify-between">
        <h1 class="text-[1.5rem] font-bold">Calendar</h1>
        <div class="w-1/5">
            <ButtonCustom :text="'Tambah Event +'" class="bg-secondary-200" @click="showAdd" />
        </div>
    </div>
    <div class="p-8 w-full flex gap-x-4">
        <div class="flex gap-x-4 items-center justify-center">
            <div class="w-[20px] h-[20px] rounded-full bg-secondary-200"></div>
            <h2>Work</h2>
        </div>
        <div class="flex gap-x-4 items-center justify-center">
            <div class="w-[20px] h-[20px] rounded-full bg-[#a83232]"></div>
            <h2>Personal</h2>
        </div>
    </div>
    <div class="w-full h-[90dvh] px-8 pb-8 ">
        <Qalendar style="background-color: white;border-radius: 1rem;" :events="calendarEvent" :config="calendarConfig"
            @delete-event="deleteEvent" @edit-event="showEdit" />
    </div>
</template>
<style>
@import "qalendar/dist/style.css";
</style>