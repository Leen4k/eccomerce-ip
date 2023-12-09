<template>
    <section class="max-h-screen overflow-y-hidden grid grid-cols-2">
        <div class="col-span-1 relative h-screen">
            <img :src="img1" class="object-cover absolute top-38" alt="">
            <img :src="logo" class="z-50 top-1/2 -translate-y-1/2 absolute" alt="">
        </div>
        <div class="col-span-1 h-full py-32 px-44">
            <AuthenticationFormVue />
            <div class="flex flex-col gap-2 p-4 justify-center items-center">
                signup with:
                <div class="flex gap-2">
                    <a class="w-10 aspect-square" href=""><img :src="google" alt=""></a>
                    <a class="w-10 aspect-square" href=""><img :src="facebook" alt=""></a>
                    <a class="w-10 aspect-square" href=""><img :src="x" alt=""></a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import img1 from "../assets/Untitled design (4) 1.png";
    import logo from "../assets/Rectangle 2.png"
    import google from "../assets/google.png";
    import facebook from "../assets/facebook.png"
    import x from "../assets/x.png"
    import AuthenticationFormVue from "../components/AuthenticationForm.vue";
</script>