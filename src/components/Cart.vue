<script setup>
    import { ref, onMounted } from 'vue';
    import Button from './Button.vue';
    import { useCartStore } from '../stores/cartStore';
    import cross from "../assets/cross 1.png"
    import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

    const cartQuantity = ref(1);
    const cartDetails = ref(null);
    import { useUserStore } from '../stores/authStore';
    import axios from 'axios';
    import { useNotificationStore } from '../stores/notificationStore';

    const store = useUserStore();
    const queryClient = useQueryClient();
    const notificationStore = useNotificationStore();
    const cartStore = useCartStore();

    const fetchCart = async () => {
       try{
        const {data} = await axios.get(`/api/ShoppingCart/user/${store.userState.id}`);
        console.log(data);
        cartStore.cartAmount = data.length;
        return data
       }catch(err){
        console.log(err);
       }
    }

    const {data, isLoading, isError} = useQuery({
        queryKey: ['getCart'],
        queryFn: fetchCart,
    })

    const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    if (Array.isArray(items)) {
        items.forEach(item => {
            if (item && item.product && typeof item.quantity === 'number') {
                totalPrice += item.product.price * item.quantity;
            } else {
                console.error('Invalid item detected:', item);
            }
        });
    } else {
        console.error('Invalid items array:', items);
    }
    return totalPrice.toFixed(2); // Round to 2 decimal places
    }

    const removeItemFromCartMutation = useMutation({
        mutationFn: (cartId) => {
            return axios.delete(`api/ShoppingCart/${cartId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCart');
            notificationStore.showSuccess("item is successfully removed from cart");
        },
        onError: () => {
            notificationStore.showError("Failed to remove from cart");
        }
    });

    const removeItemFromCart = (cartId) => {
        removeItemFromCartMutation.mutate(cartId);
    };

    const updateCartItemQuantity = async (cartId, newQuantity) => {
        if(newQuantity == 0){
            removeItemFromCart(cartId)
        }
        try {
            // Make a PUT request to update the quantity of the item in the shopping cart
            await axios.patch(`/api/ShoppingCart/${cartId}`, { quantity: newQuantity });

            // Invalidate the 'getCart' query to refetch the updated cart data
            queryClient.invalidateQueries('getCart');

            // Show a success notification
            notificationStore.showSuccess(`Quantity updated for cart item ${cartId}`);
        } catch (error) {
            console.error('Failed to update cart item quantity:', error);
            // Show an error notification
            notificationStore.showError(`Failed to update quantity for cart item ${cartId}`);
        }
    };

</script>

<template>
    <section>
        <div :class="cartStore.isOpen? 'right-0 top-0 bottom-0 bg-secondary fixed h-screen w-[500px] p-8 transition-all z-[1000]' : '-right-[300%] top-0 bottom-0 transition-all bg-secondary fixed h-screen w-[500px] p-8'">
            <div class="flex justify-between my-4 items-center">
                <span class="text-2xl">cart</span>
                <span @click="cartStore.toggleOpen"><img :src="cross" class="w-4 aspect-square cursor-pointer transition-all hover:scale-90" alt="close cart"></span>
            </div>
            <div class="h-3/4 rounded-xl overflow-scroll gap-2">
                <article v-for="(cart,index) in data" :key="index" class="flex relative bg-[#fff] rounded-lg mt-2 h-[180px] overflow-hidden text-sm shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                <span @click="removeItemFromCart(cart.id)" class="w-6 h-6 absolute right-1 top-1 text-primary cursor-pointer hover:scale-110 transition-all"><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/trash-512.png" alt="delete icon"></span>
                <div class="flex w-[140px]" >
                    <img class="object-cover flex-1" src="https://images.pexels.com/photos/12725054/pexels-photo-12725054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
                </div>
                <div class="flex-1 flex flex-col gap-1 p-2">
                    <p class="text-primary">Category</p>
                    <p>{{ cart.product.name }}</p>
                    <span class="text-primary">price ${{ cart.product.price }}</span>
                    <p>Size:42</p>
                    <p>stock</p>
                    <input v-model="cart.quantity" @input="updateCartItemQuantity(cart.id, $event.target.value)" class="p-1 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]" type="number">
                </div>
            </article>
            </div>
            <div class="mt-4">
                Order Summary
                <div class="flex flex-col">
                    <div class="flex justify-between text-slate-500">
                        <span>{{ data?.length > 0 ? data?.length : 0 }} item</span>
                        <span>${{ calculateTotalPrice(data) }}</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center">
                <Button text="Checkout" :isPrimary="true" icon="hello"  />
            </div>
        </div>
    </section>
</template>