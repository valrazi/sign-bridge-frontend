<script setup lang="ts">
const showMore = ref<boolean>(false)
const prices = ref([
    {
        name: 'Early Bird',
        date: '3 - 18 Agustus 2024',
        price: 200000,
        selected: 0
    },
    {
        name: 'Regular Ticket',
        date: '3 - 18 Agustus 2024',
        price: 220000,
        selected: 0
    },
    {
        name: 'VIP Ticket',
        date: '3 - 18 Agustus 2024',
        price: 300000,
        selected: 0
    }
])

const subtotal = ref<number>(0)
const addQty = (index: number) => {
    prices.value[index].selected += 1
    subtotal.value = prices.value.reduce((acc, cur) => acc + (cur.price * cur.selected), 0)
}

const minQty = (index: number) => {
    prices.value[index].selected -= 1
    subtotal.value = prices.value.reduce((acc, cur) => acc + (cur.price * cur.selected), 0)
}

const promoCode = ref<string>('')
const isPromoValid = ref<boolean>(false), isPromoError = ref<boolean>(false), textPromo = ref<string>(''), promoValue = ref<number>(0)
const promoValid = () => {
    textPromo.value = promoCode.value
    if (promoCode.value == 'KODEPROMO50%') {
        isPromoValid.value = true
        promoValue.value = (subtotal.value * 0.5)
    } else {
        isPromoValid.value = false
        isPromoError.value = true
    }
}

const emit = defineEmits(['changeView'])
const changeView = (viewName: string) => {
    emit('changeView', viewName)
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>
<template>
    <div class="tixfly-sdk-w-full tixfly-sdk-min-h-dvh">
        <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-gap-x-4">
            <img class="tixfly-sdk-w-[15%] tixfly-sdk-max-h-40 tixfly-sdk-rounded-xl tixfly-sdk-object-cover"
                src="https://asset.kompas.com/crops/A5cwTkFX8Z36eGjTuAWbekwg_y8=/3x0:1200x798/1200x800/data/photo/2023/02/28/63fdac77cacd8.jpg"
                alt="">
            <div class="tixfly-sdk-px-4 tixfly-sdk-text-text-secondary">
                <h1 class="tixfly-sdk-text-xl tixfly-sdk-font-bold tixfly-sdk-text-text-primary">IDS SPECIAL STAGE</h1>
                <p class="tixfly-sdk-flex tixfly-sdk-gap-x-2 tixfly-sdk-items-center tixfly-sdk-mt-2 tixfly-sdk-mb-1">
                    <font-awesome-icon :icon="['far', 'clock']" /><span>5 Oct 2024, 19:00 - 23:00</span>
                </p>
                <p class="tixfly-sdk-flex tixfly-sdk-gap-x-2 tixfly-sdk-items-center">
                    <font-awesome-icon :icon="['fas', 'location-dot']" /><span>Meikarta Speedway</span>
                </p>
                <p :class="{ 'tixfly-sdk-line-clamp-2': !showMore }">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam adipisci distinctio praesentium
                    natus quas? Dolores architecto dolorum ipsum repellat enim eaque molestiae, expedita hic provident?
                    Inventore voluptatibus repudiandae quam animi.
                    Excepturi totam consequuntur sed repellendus blanditiis eveniet amet, animi tenetur recusandae
                    sapiente earum aut mollitia eaque cumque vel praesentium officiis atque laudantium explicabo quae
                    facilis dolores delectus labore odio. Quo?
                    Recusandae voluptatem vitae assumenda? Eaque fuga ea quos iste enim totam, magnam quia quas aliquid
                    similique, itaque laborum autem expedita illo quasi hic odio non tempore nesciunt consequatur
                    exercitationem ipsum?
                    Beatae tenetur voluptas perspiciatis quasi accusantium veniam libero porro nesciunt sunt quidem,
                    neque expedita praesentium a maxime sapiente, dolores vel aliquid quaerat voluptate odio minus, unde
                    qui! Excepturi, distinctio atque!
                    Nobis incidunt, eius in alias assumenda accusantium dignissimos excepturi deleniti exercitationem,
                    magni recusandae dolore aliquam voluptatum omnis dicta, id blanditiis? Repudiandae rerum odit
                    eligendi quidem dolorem ullam, doloremque inventore quisquam?
                </p>
                <button class="tixfly-sdk-border-b" @click="showMore = !showMore">
                    <span v-if="!showMore">See More</span>
                    <span v-else>See Less</span>
                </button>
            </div>
        </div>

        <div class="divider"></div>

        <div class="tixfly-sdk-w-full">
            <h1 class="tixfly-sdk-text-xl tixfly-sdk-font-bold tixfly-sdk-mb-2">Ticket Tier</h1>

            <div class="tixfly-sdk-w-full" v-for="(p, i) in prices">
                <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-between">
                    <div>
                        <p class="tixfly-sdk-font-bold" :class="{ 'tixfly-sdk-mb-2': i != 0 }">{{ p.name }}</p>
                        <p class="tixfly-sdk-flex tixfly-sdk-gap-x-2 tixfly-sdk-items-center tixfly-sdk-mt-2 tixfly-sdk-mb-1" v-if="i == 0">
                            <font-awesome-icon :icon="['far', 'clock']" /><span>{{ p.date }}</span>
                        </p>
                        <p class="tixfly-sdk-font-bold">Rp.{{ p.price }}</p>
                    </div>
                    <div class="tixfly-sdk-flex tixfly-sdk-flex-col tixfly-sdk-justify-center">
                        <button @click="addQty(i)" v-if="!p.selected"
                            class="tixfly-sdk-bg-card-secondary tixfly-sdk-w-fit tixfly-sdk-px-4 tixfly-sdk-py-1.5 tixfly-sdk-rounded-lg">Buy</button>

                        <div class="tixfly-sdk-w-fit tixfly-sdk-px-4 tixfly-sdk-bg-card-secondary tixfly-sdk-py-1.5 tixfly-sdk-items-center tixfly-sdk-rounded-lg tixfly-sdk-flex tixfly-sdk-gap-x-4" v-else>
                            <p class="tixfly-sdk-cursor-pointer" @click="minQty(i)"><font-awesome-icon :icon="['fas', 'minus']" />
                            </p>
                            <input class="tixfly-sdk-w-[2rem] tixfly-sdk-border-0 tixfly-sdk-bg-transparent tixfly-sdk-text-center" type="number" disabled
                                v-model="p.selected">
                            <p class="tixfly-sdk-cursor-pointer" @click="addQty(i)"><font-awesome-icon :icon="['fas', 'plus']" />
                            </p>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
            </div>
        </div>

        <div class="tixfly-sdk-w-full" v-if="prices.some((p) => p.selected)">
            <h1 class="tixfly-sdk-text-xl tixfly-sdk-font-bold tixfly-sdk-mb-2">Promo Code</h1>
            <div
                class="tixfly-sdk-bg-card-secondary tixfly-sdk-w-[20%] tixfly-sdk-border tixfly-sdk-border-text-secondary tixfly-sdk-rounded-lg tixfly-sdk-flex tixfly-sdk-justify-between tixfly-sdk-items-center tixfly-sdk-text-text-secondary tixfly-sdk-px-2 tixfly-sdk-py-1">
                <p><font-awesome-icon :icon="['fas', 'tag']" /></p>
                <input type="text" class="tixfly-sdk-w-1/2 tixfly-sdk-h-fit tixfly-sdk-border-none tixfly-sdk-bg-transparent tixfly-sdk-text-xs" placeholder="Enter Promo Code"
                    v-model="promoCode">
                <button @click="promoValid" class="tixfly-sdk-border-b tixfly-sdk-border-text-secondary tixfly-sdk-text-xs">Apply</button>
            </div>
            <div class="tixfly-sdk-w-1/4 tixfly-sdk-flex tixfly-sdk-gap-x-4 tixfly-sdk-my-2" v-if="isPromoValid">
                <p class="tixfly-sdk-font-bold">{{ textPromo }}</p>
                <img src="@/assets/img/applied.png" class="tixfly-sdk-w-14" alt="">
            </div>
            <div class="tixfly-sdk-w-1/4 tixfly-sdk-flex tixfly-sdk-gap-x-4 tixfly-sdk-my-2 tixfly-sdk-items-center" v-if="!isPromoValid && isPromoError">
                <p class="tixfly-sdk-tixfly-sdk-font-bold">{{ textPromo }}</p>
                <h1 class="tixfly-sdk-tixfly-sdk-text-red-500">Promo Invalid</h1>
            </div>
            <div class="divider"></div>
        </div>


        <div class="tixfly-sdk-w-full" v-if="prices.some((p) => p.selected)">
            <h1 class="tixfly-sdk-text-xl tixfly-sdk-font-bold">Order Details</h1>
            <div class="tixfly-sdk-w-full tixfly-sdk-my-4">
                <div class="tixfly-sdk-w-full" v-for="(p, i) in prices">
                    <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-between" v-if="p.selected">
                        <div>
                            <p class="tixfly-sdk-font-semibold" :class="{ 'tixfly-sdk-mb-2': i != 0 }">{{ p.name }}</p>
                            <p class="tixfly-sdk-font-semibold">{{ p.selected }} x Rp.{{ p.price }}</p>
                        </div>
                        <div class="tixfly-sdk-flex tixfly-sdk-flex-col tixfly-sdk-justify-center">
                            <p>Rp{{ p.price * p.selected }}</p>
                        </div>
                    </div>
                    <div class="divider" v-if="p.selected"></div>
                </div>
            </div>
            <div class="tixfly-sdk-w-full" v-if="prices.some((p) => p.selected)">
                <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-between tixfly-sdk-text-lg">
                    <p>Subtotal</p>
                    <p>Rp{{ subtotal }}</p>
                </div>
                <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-between tixfly-sdk-text-lg tixfly-sdk-my-2" v-if="promoValue">
                    <p>Diskon</p>
                    <p>Rp{{ promoValue }}</p>
                </div>
                <div class="divider"></div>
                <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-between tixfly-sdk-text-lg tixfly-sdk-font-bold tixfly-sdk-my-2">
                    <p>Total Price</p>
                    <p>Rp{{ promoValue ? subtotal - promoValue : subtotal }}</p>
                </div>
                <div class="divider"></div>
            </div>
        </div>
        <div class="tixfly-sdk-w-full tixfly-sdk-flex tixfly-sdk-justify-end tixfly-sdk-gap-x-4">
            <button class="tixfly-sdk-w-fit tixfly-sdk-px-12 tixfly-sdk-py-1.5 tixfly-sdk-border tixfly-sdk-border-text-primary tixfly-sdk-rounded-lg"
            @click="changeView('home')">Back</button>
            <button 
            v-if="prices.some((p) => p.selected)"
            @click="changeView('atendee')"
            class="tixfly-sdk-w-fit tixfly-sdk-px-12 tixfly-sdk-py-1.5 tixfly-sdk-bg-white tixfly-sdk-border tixfly-sdk-border-text-primary tixfly-sdk-rounded-lg">
                <h1 class="tixfly-sdk-bg-gradient-to-br tixfly-sdk-from-[#CE4F51]  tixfly-sdk-to-[#8C54FB] tixfly-sdk-text-transparent tixfly-sdk-inline-block tixfly-sdk-bg-clip-text">Next</h1>
            </button>
        </div>
    </div>
</template>