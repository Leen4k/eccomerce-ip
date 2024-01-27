import { defineStore } from "pinia";
import { ref } from "vue"

export const useCartStore = defineStore("cartStore",() => {
    const isOpen = ref(false);

    const toggleOpen = () => {
        isOpen.value = !isOpen.value;
    }

    return{
        isOpen,
        toggleOpen,
    }
})