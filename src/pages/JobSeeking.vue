<script setup lang="ts">
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
                    isEditable: false,
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
onMounted(() => {
    getData()
})
</script>
<template>
    <div class="w-full flex justify-center">
        <div class="w-[90%] min-h-[80dvh] px-4 pt-4 pb-8">
            <div class="w-full flex gap-x-4 my-4">
                <div class="flex gap-x-4 items-center justify-center">
                    <div class="w-[20px] h-[20px] rounded-full bg-secondary-200"></div>
                    <h2>Event 1</h2>
                </div>
                <div class="flex gap-x-4 items-center justify-center">
                    <div class="w-[20px] h-[20px] rounded-full bg-[#a83232]"></div>
                    <h2>Event 2</h2>
                </div>
            </div>
            <Qalendar style="background-color: white;border-radius: 1rem;" :events="calendarEvent" :config="calendarConfig"
             />
        </div>
    </div>
</template>
<style>
@import "qalendar/dist/style.css";
</style>