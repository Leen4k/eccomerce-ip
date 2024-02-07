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
    const fetchProduct = async () => {
        try{
            const {data} = await axios.get("api/products")
            console.log(data);
            return data;
        }catch(err){
            console.log(err);
        }
    }

    const {data, error, isLoading, isFetching} = useQuery({
        queryKey: ['product'],
        queryFn: fetchProduct,
    })


</script>

<template>
    <section class="overflow-hidden">
        <img :src="backgroundStyle" class="absolute left-0 -top-32 -z-[5]" alt="">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-32 md:my-36">
            <div class="overflow-hidden rounded-lg">
                
                <img src="https://www.pngall.com/wp-content/uploads/14/Louis-Vuitton-Shoes-No-Background.png" alt="">
            </div>
            <div class="flex flex-col justify-center gap-4 md:px-8 bg-white">
                <h1>
                <div>
                <input class="text-slate-500" style="border-radius: 15px 0px 0px 15px; border: solid 1px; width: 50%; height: 40px; padding-left: 5px;padding-right: 5px;" type="email" v-model="email" placeholder="email123@gmail.com" />

                <button style="width: 20%; height: 40px; background: #470CED; color: white; border-radius: 0px 15px 15px 0px;" @click="submit">Subscribe</button>
                </div>
                    

               </h1>
                <h1 class="text-6xl font-bold">New Collection</h1>
                <p class="text-slate-500">We gave the world an Original and you gave us a thousand back.</p>
                <div>
                    <a href="#product"><Button class="w-auto" text="Shop Now" :isPrimary="true" icon="hello"  /></a>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-32 md:my-36 relative">
            <img :src="backgroundStyle" class="absolute -right-16 -rotate-90 -top-48 -z-[6]" alt="">
            <div class="overflow-hidden rounded-lg order-2">
                <img src="https://www.pngall.com/wp-content/uploads/14/Louis-Vuitton-Shoes-No-Background.png" alt="">
            </div>
            <div class="flex flex-col justify-center gap-4 md:px-8 order-1">
                <h1 class="text-6xl font-bold">New Collection</h1>
                <p class="text-slate-500">We would like o gave the world an Original and you gave us a thousand back.</p>
                <div>
                    <Button class="w-auto" text="Shop Now" :isPrimary="true" icon="hello"  />
                </div>
            </div>
        </div>
        <Promotion :data="data" promotionTitle="Trending Products" promotionDescription="Top sales this week" />
        <!-- <Promotion promotionTitle="Popular Products" promotionDescription="Top sales this week" /> -->
        <h1 v-if="isError">error...</h1>
        <SkeletonLoading :isLoading="isLoading" />

    </section>  
</template>


