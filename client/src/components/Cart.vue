<script setup>
    import { ref } from 'vue';
    import Button from './Button.vue';
    import { useCartStore } from '../stores/cartStore';
    import cross from "../assets/cross 1.png"
    const cartStore = useCartStore();
    const cartQuantity = ref(1);
</script>

<template>
    <div :class="cartStore.isOpen? 'right-0 top-0 bottom-0 bg-secondary fixed h-screen w-[500px] p-8 transition-all z-[1000]' : '-right-[300%] top-0 bottom-0 transition-all bg-secondary fixed h-screen w-[500px] p-8'">
        <div class="flex justify-between my-4 items-center">
            <span class="text-2xl">cart</span>
            <span @click="cartStore.toggleOpen"><img :src="cross" class="w-4 aspect-square cursor-pointer transition-all hover:scale-90" alt="close cart"></span>
        </div>
        <div class="flex bg-[#fff] rounded-lg h-[150px] overflow-hidden text-sm shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <div class="flex w-[140px]" >
                <img class="object-cover flex-1" src="https://images.pexels.com/photos/12725054/pexels-photo-12725054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
            </div>
            <div class="flex-1 flex flex-col gap-1 p-2">
                <p class="text-primary">Category</p>
                <p>product name</p>
                <span class="text-primary">price</span>
                <p>Size:42</p>
                <p>stock</p>
                <input v-model="cartQuantity" type="number">
            </div>
        </div>
        <div>
            Order Summary
            <div class="flex flex-col">
                <div class="flex justify-between text-slate-500">
                    <span>1 item</span>
                    <span>$122</span>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <Button text="Checkout" :isPrimary="true" icon="hello"  />
        </div>
    </div>
</template>