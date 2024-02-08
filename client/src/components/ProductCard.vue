//ousa
<script setup>
    import Button from "./Button.vue";
    import { useUserStore } from "../stores/authStore";
    import {useNotificationStore} from "../stores/notificationStore"
    import {ref} from "vue"
    import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

    defineProps({
        // data: Array,
        id: String,
        name: String,
        images: Object,
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
            }, {headers:{
              "Authorization": `Bearer ${store.tokenState.token}`
          }});
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCart');
            notificationStore.showSuccess("Successfully added to cart");
        },
        onError: () => {
            notificationStore.showError("Please login to add item to cart");
        }
    });

    const updateItemInCartMutation = useMutation({
        mutationFn: (data) => {
            const {cartId, quantity} = data;
            console.log(cartId);
            return axios.patch(`api/ShoppingCart/${cartId}`, {
                quantity
            }, {headers:{
              "Authorization": `Bearer ${store.tokenState.token}`
          }});
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCart');
            notificationStore.showSuccess("Successfully added to cart");
        },
        onError: (err) => {
            console.log(err);
            notificationStore.showError("Please login to add item to cart");
        }
    });

    const addItemToCart = (productId) => {
    // Make a GET request to retrieve the user's shopping cart items
    if(store?.userState?.id){
        axios.get(`/api/ShoppingCart/user/${store.userState.id}`,{headers:{
              "Authorization": `Bearer ${store.tokenState.token}`
          }})
        .then(({ data }) => {
            // Check if the product with the given ID already exists in the cart
            const existingProduct = data.find(item => item.product.id === productId);
            console.log(existingProduct);

            if (existingProduct) {
                // Product already exists in the cart
                // You can handle this case based on your application's logic
                // For example, you might want to update the quantity of the existing product
                // You can call a separate function to update the quantity here
                const dataToUpdate = {
                    cartId: existingProduct.id,
                    quantity: existingProduct.quantity += 1
                }
                updateItemInCartMutation.mutate(dataToUpdate);
            } else {
                // Product does not exist in the cart, proceed to add it
                // You can call your mutation function here
                addItemToCartMutation.mutate(productId);
            }
        })
        .catch((error) => {
            console.error('Error retrieving shopping cart:', error);
        });
    }else{
        store.showError("Please Login to go shopping")
    }
};



</script>
<template>

    <article class="flex flex-col gap-4 bg-secondary overflow-hidden rounded-xl h-[450px] p-4">
        <div class="flex w-full overflow-hidden">
            <img 
                 v-for="(image,index) in images" :key="index" :src="`http://localhost:7000/api/images/${image.name}`" :alt="2+2"
                class="object-center object-cover hover:scale-125 transition-all flex-1 h-[300px]"
            >
            <!-- <p>{{ image.name }}</p> -->
        </div>
        <div class="flex flex-col justify-center h-[100px]">
            <a :href="`/product-detail/${id}?pagination=off`" class="font-bold hover:underline hover:font-bold">{{ name.slice(0,30) }} <span v-if="name.length>30">...</span></a>
            <p class="text-primary">{{ category }}</p>
            <span class="flex justify-between">
                <p><span>$ </span>{{ price }}</p>
                <Button @click="()=>{addItemToCart(id)}" text="Add" :isPrimary="true" icon="hello"  />
            </span>
        </div>
    </article>
</template>


