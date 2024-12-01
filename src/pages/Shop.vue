<template>
    <HomeShop/>
    <div class="w-full min-h-[300px] py-4 flex flex-col justify-center items-center gap-4">
        <h1 class="text-[2rem] font-bold">Shop</h1>
        <h2>Klik tombol dibawah untuk kamu melakukan pembelanjaan alat bantu dengar</h2>
        <img src="@/assets/img/waicon.png" class="w-20" alt="">
        <div class="w-1/4">
            <ButtonCustom :text="'Lanjut ke Chat'" class="bg-secondary-200 text-black"/>
        </div>
    </div>
</template>