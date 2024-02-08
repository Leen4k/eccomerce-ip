<script setup>
    //importing the store 
    import {useDemoListStore} from "../stores/demoStore"
    import { storeToRefs } from "pinia";
    import Rating from 'primevue/rating';
    import { ref, watch } from "vue";
    import Promotion from "../components/Promotion.vue";
    import { useProductStore } from "../stores/productStore";
    import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
    import axios from "axios";
    import SkeletonLoading from "../components/SkeletonLoading.vue";
    import Button from "../components/Button.vue";
    import backgroundStyle from "../assets/Untitled design (4) 1.png"

  
    const n = ref(2);
    // calling the store
    const store = useDemoListStore();
    //we can destructure the variables in the store like so....
    const {demoList} = storeToRefs(store);
    // console.log(demoList.value);
    //to call the function from the store we can..
    const {addTodo} = store;
    //basically if u wanna use it simply ...

    // const productStore = useProductStore();
    // const fetchProduct = productStore.fetchProduct;
    const fetchPromotion = async () => {
        try{
            const {data} = await axios.get("/api/promotions")
            console.log(data);
            return data;
        }catch(err){
            console.log(err);
        }
    }

    const {data, error, isLoading, isFetching} = useQuery({
        queryKey: ['promotions'],
        queryFn: fetchPromotion,
    })

    const checkIfIndexIsEven = (value) => {
        if (value % 2 === 0) {
            return true; 
        } else {
            return false; 
        }
};

const shoeData = [
    {
        name: "Nike Air Max",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_nike_principal.jpg"
    },
    {
        name: "Adidas Ultraboost",
        logo: "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
    },
    {
        name: "Puma RS-X",
        logo: "https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg"
    },
    {
        name: "New Balance 990",
        logo: "https://4feetshoes.com/cdn/shop/collections/newbalance.jpg?v=1591819118"
    },
    {
        name: "Reebok Classic Leather",
        logo: "https://i.pinimg.com/736x/ac/91/be/ac91beb49db43a1ec436fcf825c15bb1.jpg"
    }
];


</script>

<template>
    <section class="snap-y snap-mandatory overflow-y-auto overflow-x-hidden">
        <img :src="backgroundStyle" class="absolute left-0 -top-32 -z-[5]" alt="">
        <div v-for="(promotion, index) in data" :key="index" class="snap-center grid grid-cols-1 md:grid-cols-2 gap-8 my-32 md:my-40">
            <div v-motion-fade-visible :class="'rounded-lg relative ' + (checkIfIndexIsEven(index) ? 'order-0' : 'order-1')">
                <img src="https://www.pngkey.com/png/detail/70-704531_jordan-shoe-png-air-jordan-court-purple.png" alt="">
                <!-- <img v-if="checkIfIndexIsEven(index)" :src="backgroundStyle" class="absolute -right-20 -top-48 -z-[1000]" alt="">
                <img v-if="!checkIfIndexIsEven(index)" :src="backgroundStyle" class="absolute -right-20 -top-48 -z-[1000]" alt=""> -->
            </div>
            <div  :class="'flex flex-col justify-center gap-4 md:px-8 ' + (checkIfIndexIsEven(index) ? 'order-1' : 'order-0')">
                <h1 v-motion-slide-left :delay="200" class="text-6xl font-bold">{{ promotion.name }}</h1>
                <p v-motion-slide-visible-right :delay="300" class="text-slate-500">{{ promotion.description }}</p>
                <div v-motion-slide-visible-bottom 
                    :delay="700"
                    :initial="{
                        y: 30,
                        opacity: 0,
                    }"
                    :enter="{
                        y: 0,
                        opacity: 1,
                        transition: {
                        y: {
                            delay: 2000,
                        },
                        opacity: {
                            duration: 3000,
                        },
                        },
                    }">
                   
                    <a :href="`/product/${promotion.product.id}`"><Button class="w-auto" text="Shop Now" :isPrimary="true" icon="hello"  /></a>
                </div>
            </div>
        </div>
        <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-32 md:my-36 relative">
            <img :src="backgroundStyle" class="absolute -right-16 -rotate-90 -top-48 -z-[6]" alt="">
            <div class="overflow-hidden rounded-lg order-2">
                <img src="https://www.pngkey.com/png/detail/70-704531_jordan-shoe-png-air-jordan-court-purple.png" alt="">
            </div>
            <div class="flex flex-col justify-center gap-4 md:px-8 order-1 bg-white">
                <h1 class="text-6xl font-bold">New Collection</h1>
                <p class="text-slate-500">We gave the world an Original and you gave us a thousand back.</p>
                <div>
                    <Button class="w-auto" text="Shop Now" :isPrimary="true" icon="hello"  />
                </div>
            </div>
        </div> -->
        <Promotion :data="data" promotionTitle="Trending Products" promotionDescription="Top sales this week" />
        <Promotion :data="data" promotionTitle="Popular Products" promotionDescription="Top views this week" />

        <!-- <Promotion promotionTitle="Popular Products" promotionDescription="Top sales this week" /> -->
        <h1 v-if="isError">error...</h1>
        <!-- <SkeletonLoading :isLoading="isLoading" /> -->
        <div v-motion-fade-visible class="mt-32">
            <h1 class="text-2xl font-bold text-center">Top Brand</h1>
            <div class="grid grid-cols-5 gap-8 py-8">
                <article v-for="(shoes,index) in shoeData" 
                         :key="index" 
                         class="flex flex-col"
                         v-motion
                        :initial="{ opacity: 0, y: 20 }"
                        :enter="{ opacity: 1, y: 0, scale: 1 }"
                        :variants="{ custom: { scale: 2 } }"
                        :delay="200 * index" 
                         >
                    <div class="rounded-full aspect-square shadow-lg">
                        <img :src="shoes.logo" class="rounded-full aspect-square object-cover" alt="">
                    </div>
                    <p class="text-center text-primary mt-8">{{ shoes.name.toUpperCase() }}</p>
                </article>
            </div>
        </div>

    </section>  
</template>


