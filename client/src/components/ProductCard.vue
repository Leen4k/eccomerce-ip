//ousa
<script setup>
    import Button from "./Button.vue";
    import { useUserStore } from "../stores/authStore";
    import {useNotificationStore} from "../stores/notificationStore"
    import {ref} from "vue"
    import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

    defineProps({
        id: String,
        name: String,
        image: String,
        price: Number,
        category: String
    })

    const store = useUserStore();
    const notificationStore = useNotificationStore();
    const initialQuantity = ref(1);
    const queryClient = useQueryClient();

    // const addItemToCart = (productId) => {
    //     axios.post("/api/ShoppingCart",{productId, userId:store.userState.id, quantity:initialQuantity.value}).then((response)=>{
    //         console.log(response);
    //         notificationStore.showSuccess("successfully added to cart");
    //     }).catch((err)=>{
    //         console.log(err);
    //         notificationStore.showError("failed to add to cart")
    //     })
    //     // alert(store.userState.id +" "+ productId +" "+ initialQuantity.value);
    // }

    // const mutation = useMutation({
    //     addItemToCart,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('getCart')
    //     }
    // })

        const addItemToCartMutation = useMutation({
        mutationFn: (productId) => {
            return axios.post("/api/ShoppingCart", {
                productId,
                userId: store.userState.id,
                quantity: initialQuantity.value
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCart');
            notificationStore.showSuccess("Successfully added to cart");
        },
        onError: () => {
            notificationStore.showError("Failed to add to cart");
        }
    });

    const addItemToCart = (productId) => {
        addItemToCartMutation.mutate(productId);
    };


</script>
<template>

    <article class="flex flex-col gap-4 bg-secondary overflow-hidden rounded-xl h-[450px] p-4">
        <div class="flex w-full overflow-hidden">
            <img 
                :src="image" 
                alt="product image"
                class="object-center object-cover hover:scale-125 transition-all flex-1 h-[300px]"
            >
        </div>
        <div class="flex flex-col justify-center h-[100px]">
            <a :href="`product/${id}`" class="font-bold hover:underline hover:font-bold">{{ name.slice(0,30) }} <span v-if="name.length>30">...</span></a>
            <p class="text-primary">{{ category }}</p>
            <span class="flex justify-between">
                <p><span>$ </span>{{ price }}</p>
                <Button @click="()=>{addItemToCart(id)}" text="Add" :isPrimary="true" icon="hello"  />
            </span>
        </div>
    </article>
</template>


